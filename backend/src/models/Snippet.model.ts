import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const snippetSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  code: { 
    type: String, 
    required: true 
  },
  language: { 
    type: String, 
    required: true, 
    lowercase: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  tags: [{ 
    type: String, 
    lowercase: true, 
    trim: true 
  }],
  visibility: { 
    type: String, 
    enum: ['public', 'private'], 
    default: 'public' 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  likesCount: { 
    type: Number, 
    default: 0 
  },
  shareToken:{
    type: String,
    unique: true,
    sparse: true
  },
  isShared: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

snippetSchema.methods.generateShareToken = function() {
  this.shareToken=uuidv4();
  this.isShared = true;
  return this.shareToken;
};

snippetSchema.methods.revokeShareToken = function() {
  this.shareToken = null;
  this.isShared = false;
}

snippetSchema.index({ author: 1, createdAt: -1 });
snippetSchema.index({ language: 1 });
snippetSchema.index({ tags: 1 });
snippetSchema.index({ visibility: 1, createdAt: -1 });
snippetSchema.index({ shareToken: 1 });

export default mongoose.model<Document>('Snippet', snippetSchema);
