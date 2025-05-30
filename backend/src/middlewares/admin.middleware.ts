import {Request,Response,NextFunction} from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User.models';

export const adminMiddleware = asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const userId=(req as any).user?.id;

    if(!userId){
        res.status(401);
        throw new Error('Not Authenticated');
    }

    const user=await User.findById(userId);

    if(!user){
        res.status(401);
        throw new Error('User not Found');
    }

    if(user.get('role')!=='admin'){
        res.status(403);
        throw new Error('Admin access required');
    }
    next();
})