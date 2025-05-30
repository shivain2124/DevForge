import { Request, Response } from 'express';
import Snippet from '../models/Snippet.model';
import Comment from '../models/Comment.model';

// Generate share link for a snippet
export const generateShareLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const snippet = await Snippet.findById(id);
    
    if (!snippet) {
      res.status(404).json({ message: 'Snippet not found' });
      return;
    }

    // Check if user owns the snippet
    if ((snippet as any).author.toString() !== userId) {
      res.status(403).json({ message: 'Not authorized to share this snippet' });
      return;
    }

    // Generate share token
    const shareToken = (snippet as any).generateShareToken();
    await snippet.save();

    res.status(200).json({
      message: 'Share link generated successfully',
      shareToken,
      shareUrl: `${process.env.FRONTEND_URL}/share/${shareToken}`
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Access snippet via share token (PUBLIC - no auth needed)
export const getSharedSnippet = async (req: Request, res: Response) => {
  try {
    const { shareToken } = req.params;

    const snippet = await Snippet.findOne({ 
      shareToken, 
      isShared: true 
    })
    .populate('author', 'username')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: 'username'
      }
    });

    if (!snippet) {
      res.status(404).json({ message: 'Shared snippet not found or sharing disabled' });
      return;
    }

    res.status(200).json({
      message: 'Shared snippet retrieved successfully',
      snippet
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Revoke sharing for a snippet
export const revokeSharing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const snippet = await Snippet.findById(id);
    
    if (!snippet) {
      res.status(404).json({ message: 'Snippet not found' });
      return;
    }

    // Check if user owns the snippet
    if ((snippet as any).author.toString() !== userId) {
      res.status(403).json({ message: 'Not authorized to modify this snippet' });
      return;
    }

    (snippet as any).revokeShareToken();
    await snippet.save();

    res.status(200).json({
      message: 'Sharing revoked successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all shared snippets by current user
export const getMySharedSnippets = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const sharedSnippets = await Snippet.find({
      author: userId,
      isShared: true
    }).populate('author', 'username');

    res.status(200).json({
      message: 'Shared snippets retrieved successfully',
      snippets: sharedSnippets
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
