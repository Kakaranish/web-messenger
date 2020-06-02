import socketio from 'socket.io';
import moment from 'moment';
import MessageModel from './models/Message';

let activeUsers = [];

export const socketActions = socket => {
    console.log(`${socket.id} connected`);

    socket.on('join', ({ nickname, room }) => {
        socket.join(room);
        console.log(`${nickname} joined room`);

        activeUsers.push({ socketId: socket.id, nickname, room });

        const sendResponse = async () => {
            const messages = (await MessageModel.find({}))
                .map(m => ({ content: m.content, nickname: m.nickname }));

            socket.emit('joinRes', [...messages, {
                nickname: 'admin',
                content: 'Welcome to the server'
            }]);
        };

        socket.to(room).emit('activeUsersChanged',
            activeUsers.filter(u => u.room === room));
        socket.to(room).emit('serverMessage', {
            nickname: 'admin',
            content: `${nickname} joined chat room`
        });

        sendResponse();
    });

    socket.on('message', message => {
        socket.to(message.room).emit('message', message);

        const saveMessage = async () => await new MessageModel({
            nickname: message.nickname,
            room: message.room,
            content: message.content,
            datetime: moment.utc()
        }).save();
        saveMessage();
    });

    socket.on('disconnect', () => {
        let currentUser = activeUsers.filter(u => u.socketId === socket.id)[0];
        if(!currentUser) return;

        activeUsers = activeUsers.filter(u => u.socketId !== socket.id);
        
        socket.to(currentUser.room).emit('activeUsersChanged',
            activeUsers.filter(u => u.room === currentUser.room));
        socket.to(currentUser.room).emit('serverMessage', {
            nickname: 'admin',
            content: `${currentUser.nickname} left room`
        });
    });
};