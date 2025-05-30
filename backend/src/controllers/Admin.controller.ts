import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Snippet from '../models/Snippet.model';
import Comment from '../models/Comment.model';
import User from '../models/User.models'


// Admin delete any snippet
export const adminDeleteSnippet = asyncHandler(async (req: Request, res: Response) => {
  const snippet = await Snippet.findById(req.params.id);
  
  if (!snippet) {
    res.status(404);
    throw new Error('Snippet not found');
  }

  // Delete all comments for this snippet
  await Comment.deleteMany({ snippet: req.params.id });
  
  // Delete the snippet
  await Snippet.findByIdAndDelete(req.params.id);
  
  res.json({ 
    message: 'Snippet deleted by admin',
    deletedSnippet: {
      id: snippet._id,
      title: snippet.get('title')
    }
  });
});


export const adminDeleteComment = asyncHandler(async (req: Request, res: Response) => {
  const comment = await Comment.findById(req.params.id);
  
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  await Comment.findByIdAndDelete(req.params.id);
  
  res.json({ 
    message: 'Comment deleted by admin',
    deletedComment: {
      id: comment._id,
      text: comment.get('text')
    }
  });
});


export const getAdminStats = asyncHandler(async (req: Request, res: Response) => {
  const totalUsers = await User.countDocuments();
  const totalSnippets = await Snippet.countDocuments();
  const totalComments = await Comment.countDocuments();
  const publicSnippets = await Snippet.countDocuments({ visibility: 'public' });
  const privateSnippets = await Snippet.countDocuments({ visibility: 'private' });

  res.json({
    message: 'Admin stats retrieved successfully',
    stats: {
      totalUsers,
      totalSnippets,
      totalComments,
      publicSnippets,
      privateSnippets
    }
  });
});

