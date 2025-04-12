import mongoose from 'mongoose';

// Base comment schema
const commentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  userAvatar: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Add methods to comment schema
commentSchema.methods.getBasicInfo = function() {
  return {
    id: this._id,
    username: this.username,
    content: this.content,
    createdAt: this.createdAt
  };
};

// Base forum post schema with discriminator key for inheritance
const options = { discriminatorKey: 'postType', collection: 'forumPosts' };

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
}, options);

// Base methods for all forum posts
forumPostSchema.methods.getPostDetails = function() {
  return {
    id: this._id,
    username: this.username,
    subject: this.subject,
    content: this.content,
    category: this.category,
    likes: this.likes,
    commentCount: this.comments.length,
    createdAt: this.createdAt,
    postType: this.postType
  };
};

// Virtual to get comment count
forumPostSchema.virtual('commentCount').get(function() {
  return this.comments ? this.comments.length : 0;
});

// Static method to find popular posts (with most likes)
forumPostSchema.statics.findPopular = function(limit = 5) {
  return this.find().sort({ likes: -1 }).limit(limit);
};

// Create base models
const ForumPost = mongoose.model('ForumPost', forumPostSchema);
const Comment = mongoose.model('Comment', commentSchema);

// Create specialized forum post types

// Sublease post schema
const subleasePostSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Types.ObjectId },
  duration: { type: String }, // e.g., "3 months"
  startDate: { type: Date },
  endDate: { type: Date },
  rent: { type: Number },
  location: { type: String }
});

// Override method for sublease posts (polymorphism)
subleasePostSchema.methods.getPostDetails = function() {
  // Call parent method first
  const basicDetails = Object.getPrototypeOf(this).getPostDetails.call(this);
  
  return {
    ...basicDetails,
    duration: this.duration,
    rentPeriod: `${this.startDate?.toLocaleDateString()} to ${this.endDate?.toLocaleDateString()}`,
    rent: this.rent,
    location: this.location
  };
};

// Roommate wanted post schema
const roommatePostSchema = new mongoose.Schema({
  location: { type: String },
  preferredGender: { type: String },
  rentRange: {
    min: { type: Number },
    max: { type: Number }
  },
  moveInDate: { type: Date },
  lifestyle: [String] // e.g., "night owl", "early riser", "non-smoker"
});

// Override method for roommate posts (polymorphism)
roommatePostSchema.methods.getPostDetails = function() {
  // Call parent method first
  const basicDetails = Object.getPrototypeOf(this).getPostDetails.call(this);
  
  return {
    ...basicDetails,
    location: this.location,
    preferredGender: this.preferredGender,
    rentRange: `$${this.rentRange?.min || 0} - $${this.rentRange?.max || 0}`,
    moveInDate: this.moveInDate?.toLocaleDateString(),
    lifestyle: this.lifestyle
  };
};

// Create discriminator models that inherit from ForumPost
const SubleasePost = ForumPost.discriminator('SubleasePost', subleasePostSchema);
const RoommatePost = ForumPost.discriminator('RoommatePost', roommatePostSchema);

export { ForumPost, SubleasePost, RoommatePost, Comment };