// Import user models
import { User } from '../models/user.js';
import {Landlord} from '../models/landlord.js';  // Assuming we updated the export 

// Import property models
import { Property } from '../models/property.js';
import { Apartment, House, Room } from '../models/propertyTypes.js';

// Import review models
import { Review, PropertyReview, LandlordReview } from '../models/reviews.js';

// Import forum models
import { ForumPost, SubleasePost, RoommatePost } from '../models/forum.js';

const pageRoute = '../Frontend/src/pages';

// Base controller that can be inherited
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
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (error) {
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
  
  // Login method
  async login(req, res) {
    try {
      const { username, password } = req.body;
      
      // Find user by username
      const user = await User.findOne({ username });
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Check password (in a real app, would use bcrypt.compare)
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
      
      const savedProperty = await property.save();
      
      // Polymorphic method call if available
      const responseData = savedProperty.getDetailedInfo 
        ? savedProperty.getDetailedInfo() 
        : savedProperty;
      
      res.status(201).json(responseData);
    } catch (error) {
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
      
      // Polymorphic method call if available
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
  
  // Override create method for forum-specific logic
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
      
      // Polymorphic method call if available
      const responseData = savedPost.getPostDetails 
        ? savedPost.getPostDetails() 
        : savedPost;
      
      res.status(201).json(responseData);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  // Get popular posts
  async getPopular(req, res) {
    try {
      const { limit } = req.query;
      const posts = await ForumPost.findPopular(limit ? parseInt(limit) : 5);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// Create controller instances
const userController = new UserController();
const propertyController = new PropertyController();
const reviewController = new ReviewController();
const forumController = new ForumController();

// Legacy/simple route handlers
const home = async (req, res) => {
    try {
        res.send('Hello World');
    } catch (error) {
        console.error(error);
    }
};

// Define a separate login function that calls userController's login method
const login = (req, res) => userController.login(req, res);

export {
  userController,
  propertyController,
  reviewController,
  forumController,
  home,
  login
};