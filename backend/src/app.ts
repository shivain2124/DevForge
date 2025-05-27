import express,{Request,Response} from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;

// CORS configuration for frontend
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Basic routes
app.get('/', (req:Request, res:Response) => {
  res.json({ 
    message: 'DevForge Backend is running lalala!',
    timestamp: new Date().toISOString()
  });
});


app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Server is healthy'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


export default app;



