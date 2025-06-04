import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import {createServer} from 'http';
import {Server} from 'socket.io';
import app from './app';

const MONGO_URI =  process.env.MONGODB_URI ;
// || mongodb://localhost:27017/devforge
const PORT = process.env.PORT || 8080;
const socketIdToUserId = new Map<string, string>();

const httpServer = createServer(app);
const io=new Server(httpServer,{
    cors:{
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    }
});


//Mongoooooo yayaya
const connectDB = async()=>{
    try{
        await mongoose.connect(MONGO_URI!);
        console.log('Connected to MongoDB!');
    } catch(error){
        console.error('MongoDB connection error:',error);
        process.exit(1);
    }
};
const activeRooms = new Map(); 
const setupSocketIO = () => {
  io.on('connection', (socket) => {
    socket.on('join_room', ({ roomId, userId }) => {
      socketIdToUserId.set(socket.id, userId);
      socket.join(roomId);
      
      if (!activeRooms.has(roomId)) activeRooms.set(roomId, new Set());
      activeRooms.get(roomId)?.add(userId);
      io.to(roomId).emit('room_users', Array.from(activeRooms.get(roomId)!));
    });

    // FOR CODE SYNC
    socket.on('code_change', ({ roomId, code }) => {
      socket.to(roomId).emit('code_update', code);
    });
    
    socket.on('leave_room', ({ roomId, userId }) => {
  if (activeRooms.has(roomId)) {
    activeRooms.get(roomId).delete(userId);
    io.to(roomId).emit('room_users', Array.from(activeRooms.get(roomId)));
  }
});

    socket.on('disconnect', () => {
      const userId = socketIdToUserId.get(socket.id);
      if (!userId) return;

      activeRooms.forEach((users, roomId) => {
        if (users.delete(userId)) { // Remove null assertion
          io.to(roomId).emit('room_users', Array.from(users));
        }
      });
      socketIdToUserId.delete(socket.id);
    });
  });
};


//Server
const startServer = async ()=>{
    await connectDB();

    setupSocketIO();

    httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📝 Test endpoint: http://localhost:${PORT}/`);
    console.log(`🔌 Socket.IO ready for real-time collaboration`);
  });
};

startServer();
