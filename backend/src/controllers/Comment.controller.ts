import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Comment from '../models/Comment.model';
import Snippet from '../models/Snippet.model';

// Get comments for a snippet
export const getCommentsForSnippet = asyncHandler(async (req: Request, res: Response) => {
  const comments = await Comment.find({ snippet: req.params.snippetId })
    .populate('author', 'username')
    .sort({ createdAt: 1 });
  
  res.json(comments);
});

// Add comment to snippet
export const addCommentToSnippet = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { text } = req.body;
  
  const snippet = await Snippet.findById(req.params.snippetId);
  if (!snippet) {
    res.status(404);
    throw new Error('Snippet not found');
  }
  
  const comment = await Comment.create({
    text,
    author: user.id,
    snippet: req.params.snippetId
  });
  
  const populatedComment = await Comment.findById(comment._id)
    .populate('author', 'username');
  
  res.status(201).json(populatedComment);
});

// Update comment
export const updateCommentById = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const comment = await Comment.findById(req.params.id);
  
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }
  
  if (comment.get('author').toString() !== user.id) {
    res.status(403);
    throw new Error('Not authorized');
  }
  
  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).populate('author', 'username');
  
  res.json(updatedComment);
});

// Delete comment
export const deleteCommentById = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const comment = await Comment.findById(req.params.id);
  
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }
  
  if (comment.get('author').toString() !== user.id) {
    res.status(403);
    throw new Error('Not authorized');
  }
  
  await Comment.findByIdAndDelete(req.params.id);
  
  res.json({ message: 'Comment deleted' });
});
