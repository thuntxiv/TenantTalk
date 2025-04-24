import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

// Derive __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import user models
import { User } from '../models/user.js';
import { Landlord } from '../models/landlord.js';

// Import property models
import { Property } from '../models/property.js';
import { Apartment, House, Room } from '../models/propertyTypes.js';

// Import review models
import { Review, PropertyReview, LandlordReview } from '../models/reviews.js';

// Import forum models
import { ForumPost, SubleasePost, RoommatePost } from '../models/forum.js';

// Import chat models
import { Chat, Message } from '../models/chats.js';

// Base controller (Inheritance)
class BaseController {
  constructor(model) {
    this.model = model;
  }
  
  // Generic CRUD operations that can be inherited
  async getAll(req, res) {
    try {
      const items = await this.model.find();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async getById(req, res) {
    try {
      const item = await this.model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async create(req, res) {
    try {
      const newItem = new this.model(req.body);
      console.log('New item:', newItem);
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (error) {
      console.log('Error:', error);
      res.status(400).json({ error: error.message });
    }
  }
  
  async update(req, res) {
    try {
      const updatedItem = await this.model.findByIdAndUpdate(
        req.params.id, 
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
      res.json(updatedItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  async delete(req, res) {
    try {
      const deletedItem = await this.model.findByIdAndDelete(req.params.id);
      if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// User controller inherits from base controller
class UserController extends BaseController {
  constructor(model = User) {
    super(model);
  }
  
  // Override create method for user-specific logic
  async create(req, res) {
    try {
      const { type, ...userData } = req.body;
      
      // Polymorphic instantiation based on user type
      let user;
      
      if (type === 'landlord') {
        user = new Landlord({
          ...userData,
          type: 'landlord'
        });
      } else {
        user = new User({
          ...userData,
          type: type || 'tenant'
        });
      }
      
      const savedUser = await user.save();
      
      // Polymorphic method call
      const userProfile = type === 'landlord' 
        ? savedUser.getLandlordProfile() 
        : savedUser.getBasicProfile();
      
      res.status(201).json(userProfile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  // Get by google ID
  async getByUserID(req, res) {
    try {
      const user = await this.model.findByUserID(req.params.id);
      if (!user) return res.status(404).json({ message: 'Item not found' });
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  }

  async getByGeneric(req, res) {
    try {
      const byEmail = await this.model.findByEmail(req.params.param);
      if (!byEmail) {
        console.log(`Email ${req.params.param} not found, checking username...`);
        const byUser = await this.model.findByUsername(req.params.param);
        if (!byUser) return res.status(404).json({ message: 'Item not found'});
        return res.json(byUser);
      }
      res.json(byEmail);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: 'User not found' });
    }
  }

  // Login method
  async login(req, res) {
    try {
      const { username, password } = req.body;
      
      // Find user by username
      const user = await User.findOne({ username });
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Check password
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Polymorphic response based on user type
      const userResponse = user.userType === 'Landlord' 
        ? user.getLandlordProfile() 
        : user.getBasicProfile();
      
      res.json({
        message: 'Login successful',
        user: userResponse
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// Property controller inherits from base controller
class PropertyController extends BaseController {
  constructor(model = Property) {
    super(model);
  }
  
  // Override create method for property-specific logic
  async create(req, res) {
    try {
      const { type, ...propertyData } = req.body;
      console.log(propertyData);
      // Polymorphic instantiation based on property type
      let property;
      
      switch (type) {
        case 'apartment':
          property = new Apartment(propertyData);
          break;
        case 'house':
          property = new House(propertyData);
          break;
        case 'room':
          property = new Room(propertyData);
          break;
        default:
          property = new Property(propertyData);
      }
      property.type = type;
      const savedProperty = await property.save();
      
      // Polymorphic method call
      const responseData = savedProperty.getDetailedInfo 
        ? savedProperty.getDetailedInfo() 
        : savedProperty;
      
      res.status(201).json(responseData);
    } catch (error) {
      console.log('Error:', error);
      res.status(400).json({ error: error.message });
    }
  }
  
  // Get properties by location
  async getByLocation(req, res) {
    try {
      const { location } = req.params;
      const properties = await Property.findByLocation(location);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByLandlord(req, res) {
    try {
      const landlordID = req.params.id;
      const properties = await Property.findByLandlord(landlordID);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// Review controller inherits from base controller
class ReviewController extends BaseController {
  constructor(model = Review) {
    super(model);
  }
  
  // Override create method for review-specific logic
  async create(req, res) {
    try {
      const { reviewType, ...reviewData } = req.body;
      
      // Polymorphic instantiation based on review type
      let review;
      
      if (reviewType === 'property') {
        review = new PropertyReview(reviewData);
      } else if (reviewType === 'landlord') {
        review = new LandlordReview(reviewData);
      } else {
        review = new Review(reviewData);
      }
      
      const savedReview = await review.save();
      
      // Polymorphic method call 
      const responseData = savedReview.getDetailedInfo 
        ? savedReview.getDetailedInfo() 
        : savedReview;
      
      res.status(201).json(responseData);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get recent reviews
  async getRecent(req, res) {
    try {
      const { days } = req.query;
      const reviews = await Review.findRecent(days ? parseInt(days) : 30);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// Forum controller inherits from base controller
class ForumController extends BaseController {
  constructor(model = ForumPost) {
    super(model);
  }
  
  // Override create method for forum-specific 
  async create(req, res) {
    try {
      const { postType, ...postData } = req.body;
      
      // Polymorphic instantiation based on post type
      let post;
      
      if (postType === 'sublease') {
        post = new SubleasePost(postData);
      } else if (postType === 'roommate') {
        post = new RoommatePost(postData);
      } else {
        post = new ForumPost(postData);
      }
      
      const savedPost = await post.save();
      
      // Polymorphic method call
      const responseData = savedPost.getPostDetails 
        ? savedPost.getPostDetails() 
        : savedPost;
      
      res.status(201).json(responseData);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

class ChatController extends BaseController {
  constructor(model = Chat) {
    super(model);
  }

  // Override get method for chat-specific logic
  async getById(req, res) {
    try {
      const user = req.params.id;
      const chats = await this.model.find({ 
        userIDs: {
          $in: [user]
        } 
      }).lean();

      if (!chats) return res.status(404).json({ message: 'Chats not found' });
      const recipientIds = chats.map(chat => 
        chat.userIDs.find(id => id !== user)
      ).filter(Boolean);
  
      // Remove duplicates
      const uniqueRecipientIds = [...new Set(recipientIds)];
      
      // Query for users
      const users = await User.find({ userID: { $in: uniqueRecipientIds } }).lean();
      
      // Mapping userID -> username
      const userMapping = users.reduce((acc, curr) => {
        acc[curr.userID] = curr.username;
        return acc;
      }, {});
      

      const modifiedChats = chats.map(chat => {
        const recipientId = chat.userIDs.find(id => id !== user) || null;
        let recipientUser = { id: recipientId, username: null };
        recipientUser.username = userMapping[recipientId] || null;
        return { 
           ...chat,
           recipientUser
        };
      });

      res.json(modifiedChats);
    } catch (error) {
      res.status(404).json({ error: error.message });
      console.error(error);
    }
  }

  async getOne(req, res) {
    try {
      const chat = await this.model.findById(req.params.id);
      if (!chat) return res.status(404).json({ message: 'Chat not found' });
      
      res.json(chat);
    }
    catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { userIDs, messages } = req.body;
      if (!userIDs || !Array.isArray(userIDs) || userIDs.length === 0) {
        return res.status(400).json({ error: 'userIDs must be a non-empty array.' });
      }

      // Sort array and compute hash
      const sortedIds = userIDs.map(id => id.toString()).sort();
      const fingerprint = crypto
        .createHash('md5')
        .update(sortedIds.join(','))
        .digest('hex');

      const chatData = {
        userIDs,
        lastSenderID: messages[0] ? messages[0].senderID : null,
        lastmessage: messages && messages.length > 0 ? messages[messages.length - 1].message : '',
        idsKey: fingerprint,
        messages: messages || []
      };

      const existingChat = await Chat.findOne({ idsKey: fingerprint });
      if (existingChat) {
        return res.status(400).json({ error: "A chat with this set of userIDs already exists." });
      }

      const newChat = new Chat(chatData);
      
      const chat = await newChat.save();
      res.status(201).json(chat);
    }
    catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }

  async addMessage(req, res) {
    try {
      const message  = req.body;
      const chat = await this.model.findById(req.params.chatid);
      if (!chat) return res.status(404).json({ message: 'Chat not found' });
      chat.lastmessage = message.message;
      chat.lastSenderID = message.senderID;
      chat.messages.push(message);
      await chat.save();
      
      res.json(chat);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

class LandlordController extends BaseController {
  constructor(model = Landlord) {
    super(model);
  }

  async getAll(req, res) {
    try {
      const landlords = await this.model.find().lean();

      const enriched = await Promise.all(landlords.map(async (ld) => {
        const propertyCount = await Property.countDocuments({ landlordID: ld._id });

        const reviews = await LandlordReview.find({ landlordID: ld._id }).lean();
        const reviewCount = reviews.length;

        const rating = reviewCount > 0
          ? parseFloat(
              (reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount)
              .toFixed(1)
            )
          : 0;

        return {
          ...ld,
          propertyCount,
          reviewCount,
          rating
        };
      }));

      res.json(enriched);
    } catch (error) {
      console.error('Error fetching landlords:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const landlordId = req.params.id;

      const landlord = await this.model.findById(landlordId).lean();
      if (!landlord) {
        return res.status(404).json({ message: 'Landlord not found' });
      }

      const properties = await Property.findByLandlord(landlordId).lean();
      const reviews = await LandlordReview.find({ landlordID: landlordId }).lean();

      let userReviews = [];
      if (reviews.length > 0) {
        // Collect unique userIds
        const userIds = [...new Set(reviews.map(r => r.userID))];
        const users = await User.find(
          { userID: { $in: userIds } },
          'username'
        ).lean();

        const usernameMap = users.reduce((m, u) => {
          m[u.userID] = u.username;
          return m;
        }, {});

        userReviews = reviews.map(r => ({
          ...r,
          username: usernameMap[r.userId] || null
        }));
      }

      const reviewCount = userReviews.length;
      const averageRating = reviewCount > 0
        ? parseFloat(
            (userReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount)
            .toFixed(1)
          )
        : 0;

      res.json({
        ...landlord,
        properties,
        reviews: userReviews,
        reviewCount,
        averageRating
      });
    } catch (error) {
      console.error('Error fetching landlord profile:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

// Controller instances
const userController = new UserController();
const propertyController = new PropertyController();
const reviewController = new ReviewController();
const forumController = new ForumController();
const chatController = new ChatController();
const landlordController = new LandlordController();

// Simple route handlers
const home = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Login function that calls userController's login method
const login = (req, res) => userController.login(req, res);

export {
  userController,
  propertyController,
  reviewController,
  forumController,
  chatController,
  landlordController,
  home,
  login
};