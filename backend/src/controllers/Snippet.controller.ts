import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Snippet from '../models/Snippet.model';
import Comment from '../models/Comment.model';
import User from '../models/User.models';

export const getAllPublicSnippets = asyncHandler(async (req: Request, res: Response) => {
  const { language, tags } = req.query;
  
  let filter: any = { visibility: 'public' };
  
  if (language) {
    filter.language = language;
  }
  
  if (tags) {
    filter.tags = { $in: (tags as string).split(',') };
  }
  
  const snippets = await Snippet.find(filter)
    .populate('author', 'username')
    .sort({ createdAt: -1 });
  
  res.json(snippets);
});

// Get my snippets
export const getCurrentUserSnippets = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const snippets = await Snippet.find({ author: user.id })
    .populate('author', 'username')
    .sort({ createdAt: -1 });
  
  res.json(snippets);
});

// Get single snippet with comments
export const getSnippetById = asyncHandler(async (req: Request, res: Response) => {
  const snippet = await Snippet.findById(req.params.id).populate('author', 'username');
  
  if (!snippet) {
    res.status(404);
    throw new Error('Snippet not found');
  }
  
  const comments = await Comment.find({ snippet: snippet._id })
    .populate('author', 'username')
    .sort({ createdAt: 1 });
  
  res.json({ ...snippet.toObject(), comments });
});

// Create snippet
export const createNewSnippet = asyncHandler(async (req: Request, res: Response) => {

  const { title, code, language, description, tags, visibility } = req.body;

  if (!title || !code || !language) {
     res.status(400).json({ 
      message: 'Title, code, and language are required',
      received: { title, code: !!code, language }
    });
    return;
  }

  // Use a hardcoded user ID for testing
  const snippet = await Snippet.create({
    title,
    code,
    language,
    description,
    tags: tags || [],
    visibility: visibility || 'public',
    author: (req as any).user.id 
  });

  res.status(201).json(snippet);
});

// Update snippet
export const updateSnippetById = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const snippet = await Snippet.findById(req.params.id);
  
  if (!snippet) {
    res.status(404);
    throw new Error('Snippet not found');
  }
  
  if (snippet.get('author').toString() !== user.id) {
    res.status(403);
    throw new Error('Not authorized');
  }
  
  const updatedSnippet = await Snippet.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  
  res.json(updatedSnippet);
});

// Delete snippet
export const deleteSnippetById = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const snippet = await Snippet.findById(req.params.id);
  
  if (!snippet) {
    res.status(404);
    throw new Error('Snippet not found');
  }
  
  if (snippet.get('author').toString() !== user.id) {
    res.status(403);
    throw new Error('Not authorized');
  }
  
  await Comment.deleteMany({ snippet: req.params.id });
  await Snippet.findByIdAndDelete(req.params.id);
  
  res.json({ message: 'Snippet deleted' });
});

// Like/Unlike snippet
export const toggleSnippetLike = asyncHandler(async (req: Request, res: Response) => {
    const user=(req as any).user;
    const snippet=await Snippet.findById(req.params.id);

    if(!snippet){
        res.status(404);
        throw new Error('Snippet Not Found');
    }

    const likes=snippet.get('likes') || [];
    const isLiked = likes.includes(user.id);

   if (isLiked) {
        snippet.get('likes').pull(user.id);
        snippet.set('likesCount', snippet.get('likesCount') - 1);
    } else {
        snippet.get('likes').push(user.id);
        snippet.set('likesCount', snippet.get('likesCount') + 1);
    }

    await snippet.save();

    res.json({
        liked:!isLiked,
        likesCount:snippet.get('likesCount')
    });
});

export const getLikedSnippets = asyncHandler(async (req:Request,res:Response)=>{
    const userId = (req as any).user.id;

    const likedSnippets = await Snippet.find({
      likes:userId,
      visibility:'public'
    })
    .populate('author','username')
    .sort({updated:-1});

    res.status(200).json({
      message:'Liked Snippet retrieved successfully',
      snippets:likedSnippets,
      count:likedSnippets.length
    });
});


// Simple user profile with just the basics
export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  
  // Get user basic info
  const user = await User.findById(userId).select('-password');
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Just count user's snippets
  const totalSnippets = await Snippet.countDocuments({ author: userId });
  const sharedSnippets = await Snippet.countDocuments({ author: userId, isShared: true });

  res.json({
    message: 'User profile retrieved successfully',
    profile: {
      username: user.get('username'),
      email: user.get('email'),
      totalSnippets,
      sharedSnippets,
      joinedAt: user.get('createdAt')
    }
  });
});

