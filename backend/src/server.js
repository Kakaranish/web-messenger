import express from 'express';
import http from 'http';
import bodyParser from "body-parser";
import socketio from 'socket.io';
import cors from 'cors';
import moment from 'moment';
import MessageModel from './models/Message';
import { connectDb } from './utils';

require('dotenv').config();

connectDb();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let activeUsers = [];

io.on('connection', socket => {
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
        console.log(`${currentUser.nickname} left room`);
        
        let currentUser = activeUsers.filter(u => u.socketId === socket.id)[0];
        activeUsers = activeUsers.filter(u => u.socketId !== socket.id);
        
        socket.to(currentUser.room).emit('activeUsersChanged',
            activeUsers.filter(u => u.room === currentUser.room));
        socket.to(currentUser.room).emit('serverMessage', {
            nickname: 'admin',
            content: `${currentUser.nickname} left room`
        });
    });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(async (req, res) => {
    console.log('Error: Unknown internal error');
    if (res) res.status(500).json({ errors: ['Internal error'] });
});

app.get('/', async (req, res) => {
    res.status(200).json({
        msg: 'Hello world'
    });
})

const port = process.env.PORT
server.listen(port, () => {
    console.log(`Listening on ${port}...`);
});