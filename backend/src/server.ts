import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './app';

const MONGO_URI =  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/snippetlogger";
const PORT = process.env.PORT || 8080;


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

//Server
const startServer = async ()=>{
    await connectDB();

    app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📝 Test endpoint: http://localhost:${PORT}/`);
  });
};

startServer();
