import mongoose, { Document } from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true, 
    trim: true 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  snippet: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Snippet', 
    required: true 
  }
}, {
  timestamps: true
});

// Indexes
commentSchema.index({ snippet: 1, createdAt: -1 });
commentSchema.index({ author: 1 });

export default mongoose.model<Document>('Comment', commentSchema);
