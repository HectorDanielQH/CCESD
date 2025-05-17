import app from './app.js';
import { connectDB } from './db.js';
import {Server as SocketServer} from 'socket.io';
import http from 'http'
import sockets from './sockets.js';

connectDB();

const server = http.createServer(app);
const httpServer=server.listen(4000);
const io=new SocketServer(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

sockets(io);