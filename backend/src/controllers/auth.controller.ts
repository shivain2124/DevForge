import { Request, Response, NextFunction } from 'express';
import User from '../models/User.models';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';

export interface AuthenticatedRequest extends Request {
  userId?: string;
  user?: any;
}

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const user = new User({ email, password, username });
  await user.save();

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  user.refreshToken = refreshToken;
  await user.save();

  res.status(201).json({
    message: 'User created successfully',
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role
    }
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  user.refreshToken = refreshToken;
  await user.save();

  res.json({
    message: 'Login successful',
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role
    }
  });
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({ message: 'Refresh token required' });
    return;
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.status(403).json({ message: 'Invalid refresh token' });
    return;
  }

  verifyRefreshToken(refreshToken);

  const newAccessToken = generateAccessToken(user._id.toString());

  res.json({
    message: 'Token refreshed successfully',
    accessToken: newAccessToken
  });
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;

  const user = await User.findOne({ refreshToken });
  if (user) {
    user.refreshToken = '';
    await user.save();
  }

  res.json({ message: 'Logged out successfully' });
};

export const getMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const user = await User.findById(req.userId).select('-password -refreshToken');
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.json({ user });
};
