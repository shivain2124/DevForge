import express,{Request,Response} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {rateLimit} from 'express-rate-limit';
import authRoutes from './routes/auth.route'
import snippetRoutes from './routes/snippet.route';
import commentRoutes from './routes/comment.route';
import sharingRoutes from './routes/sharing.route';
import adminRoutes from './routes/admin.route';
import { notFound, errorHandler } from './middlewares/error.middleware';

const app = express();
const PORT = process.env.PORT || 8080;

//helmet
app.use(helmet());

//limit

// CORS configuration for frontend
app.use(cors({
  origin: ['http://localhost:5173','https://dev-forge-frontend.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const limiter = rateLimit({
  windowMs:15*60*1000 , //15 mins
  limit:100,
  message: {
    error: 'Too many requests, please try again later'
  },
  standardHeaders:true,
  legacyHeaders:false,
  skip: (req) => req.method === 'OPTIONS',
})

app.use('/api',limiter);


app.use((req, res, next) => {  // 5.x ka panga
  if (req.body === undefined) {
    req.body = {};
  }
  next();
});

// Additional safety middleware
app.use((req, res, next) => {
  if (req.body === undefined || req.body === null) {
    req.body = {};
  }
  console.log('Middleware check - req.body:', req.body, 'type:', typeof req.body);
  next();
});

// Basic routes before API routes
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

// API routes
app.use('/api/auth',authRoutes);
app.use('/api/snippets', snippetRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api',sharingRoutes);
app.use('/api/admin',adminRoutes);

//error handling middleware 
app.use(notFound);
app.use(errorHandler);


export default app;



