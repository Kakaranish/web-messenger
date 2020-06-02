import express from 'express';
import http from 'http';
import bodyParser from "body-parser";
import socketio from 'socket.io';
import cors from 'cors';

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
    console.log(`${socket.id} connected`);

    socket.on('join', ({ nickname, room }, callback) => {
        socket.join(room);
        console.log(`${nickname} joined room ${room}`);

        socket.emit('serverMessage', {
            nickname: 'admin',
            message: 'Welcome to the server!'
        });

        callback();
    });

    socket.on('message', (message, callback) => {
        console.log(message);
        socket.to(message.room).emit('message', message);
        callback();
    });

    socket.on('disconnect', () => {
        console.log(`${socket.id} diconnected`)
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