import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Snippet from '../models/Snippet.model';
import Comment from '../models/Comment.model';

// Get all public snippets
export const getAllPublicSnippets = asyncHandler(async (req: Request, res: Response) => {
  const snippets = await Snippet.find({ visibility: 'public' })
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
  const user = (req as any).user;
  const { title, code, language, description, tags, visibility } = req.body;
  
  const snippet = await Snippet.create({
    title,
    code,
    language,
    description,
    tags: tags || [],
    visibility: visibility || 'public',
    author: user.id
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
    const isLiked = likes.incldudes(user.id);

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
