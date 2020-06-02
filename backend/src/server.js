import http from 'http';
import socketio from 'socket.io';
import { connectDb } from './utils';
import { socketActions } from './socket-config';
import app from './app';

require('dotenv').config();

connectDb();

const server = http.createServer(app);
const io = socketio(server);
io.on('connection', socketActions);

const port = process.env.PORT
server.listen(port, () => {
    console.log(`Listening on ${port}...`);
});