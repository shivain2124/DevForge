import express,{Request,Response} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {rateLimit} from 'express-rate-limit';
import authRoutes from './routes/auth.route'
import snippetRoutes from './routes/snippet.route';
import commentRoutes from './routes/comment.route';

const app = express();
const PORT = process.env.PORT || 8080;

//helmet
app.use(helmet());

//limit
const limiter = rateLimit({
  windowMs:15*60*1000 , //15 mins
  limit:100,
  message: {
    error: 'Too many requests, please try again later'
  },
  standardHeaders:true,
  legacyHeaders:false,
})

app.use('/api',limiter);

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

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/snippets', snippetRoutes);
app.use('/api/comments', commentRoutes);


// Basic routes
app.get('/', (req:Request, res:Response) => {
  res.json({ 
    message: 'DevForge Backend is running lalala!',
    timestamp: new Date().toISOString()
  });
});




app.get('/api/health', (req:Request, res:Response) => {
  res.json({ 
    status: 'OK',
    message: 'Server is healthy'
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});


// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;



