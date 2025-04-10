import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  userAvatar: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const forumPostSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  userAvatar: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  category: {
    type: String,
    enum: ['forSublease', 'toSublease', 'landlord', 'roommate', 'general'],
    required: true
  },
  likes: { type: Number, default: 0 },
  comments: [commentSchema]
});

const ForumPost = mongoose.model('ForumPost', forumPostSchema);
const Comment = mongoose.model('Comment', commentSchema);

export { ForumPost, Comment };