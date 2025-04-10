import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext.tsx';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';
import {v4} from 'uuid';
import '../styles/ForumPage.css';

// Types
interface ForumPost {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  subject: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  category: 'forSublease' | 'toSublease' | 'landlord' | 'roommate' | 'general';
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

const ForumPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  // State for posts
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // New post form state
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);
  const [newPostSubject, setNewPostSubject] = useState<string>('');
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [newPostCategory, setNewPostCategory] = useState<string>('general');
  const [newPostImage, setNewPostImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [newComment, setNewComment] = useState<string>('');

  // Filter states
  const [usernameFilter, setUsernameFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Fetch on mount
  useEffect(() => {

    // Example mock data
    const mockPosts: ForumPost[] = [
      {
        id: '1',
        userId: 'user1',
        username: 'Alex Johnson',
        userAvatar: 'https://via.placeholder.com/40',
        subject: 'Beware of hidden fees at Campus View Apartments',
        content:
          "I recently moved into Campus View and discovered they charge extra for parking, which wasn't mentioned during the tour. Make sure to ask about ALL fees before signing a lease!",
        createdAt: '2025-03-15T14:32:00Z',
        category: 'general',
        likes: 24,
        comments: [
          {
            id: 'c1',
            userId: 'user2',
            username: 'Maria Garcia',
            userAvatar: 'https://via.placeholder.com/40',
            content:
              'I had the same experience. They also charged me a "community fee" that wasn\'t disclosed upfront.',
            createdAt: '2025-03-15T15:10:00Z'
          },
          {
            id: 'c2',
            userId: 'user3',
            username: 'James Wilson',
            userAvatar: 'https://via.placeholder.com/40',
            content: 'Thanks for the heads up! I was considering them for next semester.',
            createdAt: '2025-03-15T16:45:00Z'
          }
        ]
      },
      {
        id: '2',
        userId: 'user4',
        username: 'Emily Chen',
        userAvatar: 'https://via.placeholder.com/40',
        subject: 'Great experience with landlord John Smith',
        content:
          "I've been renting from John Smith for two years now. He's always responsive to maintenance requests and is fair with the security deposit. Highly recommend his properties!",
        imageUrl: 'https://via.placeholder.com/600x400',
        createdAt: '2025-03-10T09:15:00Z',
        category: 'landlord',
        likes: 42,
        comments: [
          {
            id: 'c3',
            userId: 'user5',
            username: 'Michael Rodriguez',
            userAvatar: 'https://via.placeholder.com/40',
            content:
              'I can second this! I lived in one of his properties last year and had a similar positive experience.',
            createdAt: '2025-03-10T10:22:00Z'
          }
        ]
      },
      {
        id: '3',
        userId: 'user6',
        username: 'Sarah Williams',
        userAvatar: 'https://via.placeholder.com/40',
        subject: 'Looking for a roommate near State University',
        content:
          "I'm a junior engineering student looking for a roommate for Fall 2025. I'm clean, quiet, and usually study in the evenings. Budget is around $700/month. Message me if interested!",
        createdAt: '2025-03-08T18:30:00Z',
        category: 'roommate',
        likes: 5,
        comments: []
      },
      {
        id: '4',
        userId: 'user7',
        username: 'David Taylor',
        userAvatar: 'https://via.placeholder.com/40',
        subject: 'New student housing being built on College Ave',
        content:
          'Just noticed they started construction on a new apartment complex on College Ave. Looks like it will be finished by Summer 2026. Should add about 200 new units to the market.',
        imageUrl: 'https://via.placeholder.com/600x400',
        createdAt: '2025-03-05T11:45:00Z',
        category: 'general',
        likes: 31,
        comments: [
          {
            id: 'c4',
            userId: 'user8',
            username: 'Jessica Brown',
            userAvatar: 'https://via.placeholder.com/40',
            content:
              'I hope they make them affordable! The market is getting ridiculous around campus.',
            createdAt: '2025-03-05T12:20:00Z'
          },
          {
            id: 'c5',
            userId: 'user9',
            username: 'Robert Martinez',
            userAvatar: 'https://via.placeholder.com/40',
            content:
              'I heard these will be luxury apartments starting at $1500/month for studios.',
            createdAt: '2025-03-05T14:10:00Z'
          },
          {
            id: 'c6',
            userId: 'user2',
            username: 'Maria Garcia',
            userAvatar: 'https://via.placeholder.com/40',
            content: 'Just what we need... more unaffordable housing 🙄',
            createdAt: '2025-03-05T15:30:00Z'
          }
        ]
      }
    ];



    //setPosts(mockPosts);
    //setFilteredPosts(mockPosts);
    setLoading(true);

    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/forumposts');
        if (!response.ok) {
          throw new Error('Failed to fetch listings from the API');
        }
        setLoading(false);
        const data = await response.json();

        const apiListings: ForumPost[] = data.map((item: any) => ({
          id: item._id,
          userId: item.userId,
          username: item.username,
          userAvatar: item.userAvatar,
          subject: item.subject,
          content: item.content,
          createdAt: item.createdAt,
          category: item.category,
          likes: item.likes,
          comments: item.comments
        }));

        console.log("Successfully fetched posts from API:", apiListings);
        
        setPosts(apiListings);
        setFilteredPosts(apiListings);
      } catch (err: any) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (!loading) {
      fetchListings();
      setLoading(false);
    }
    
    setLoading(false);
  }, []);

  // Filtering + sorting
  useEffect(() => {
    let result = [...posts];

    // Username filter
    if (usernameFilter) {
      result = result.filter(post =>
        post.username.toLowerCase().includes(usernameFilter.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter) {
      result = result.filter(post => post.category === categoryFilter);
    }

    // Date filter
    if (dateFilter) {
      const now = new Date();
      if (dateFilter === 'today') {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
        result = result.filter(post => post.createdAt >= today);
      } else if (dateFilter === 'last-week') {
        const lastWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString();
        result = result.filter(post => post.createdAt >= lastWeek);
      } else if (dateFilter === 'last-month') {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toISOString();
        result = result.filter(post => post.createdAt >= lastMonth);
      }
    }

    // Sort by
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === 'most-liked') {
      result.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'most-commented') {
      result.sort((a, b) => b.comments.length - a.comments.length);
    }

    setFilteredPosts(result);
  }, [posts, usernameFilter, categoryFilter, dateFilter, sortBy]);

  // Handle image input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setNewPostImage(selectedFile);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Create new post
  const handleCreatePost = () => {
    if (!newPostSubject.trim() || !newPostContent.trim()) {
      alert('Please fill in both subject and content fields.');
      return;
    }

    // In a real app, you'd upload the image and post data to your server
    const imageUrl = newPostImage ? 'https://via.placeholder.com/600x400' : undefined;

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      userId: user?.id || 'anonymous',
      username: user?.name || 'Anonymous User',
      userAvatar: user?.picture || 'https://via.placeholder.com/40',
      subject: newPostSubject,
      content: newPostContent,
      imageUrl,
      createdAt: new Date().toISOString(),
      category: newPostCategory as any,
      likes: 0,
      comments: []
    };

    setPosts([newPost, ...posts]);

    // Reset form
    setNewPostSubject('');
    setNewPostContent('');
    setNewPostCategory('general');
    setNewPostImage(null);
    setImagePreview(null);
    setIsCreatingPost(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  const handleNewComment = (postId: string) => {
    const newCommentObj: Comment = {
      id: v4(),
      userId: "elk120df3099",
      username: "James",
      userAvatar: "https://via.placeholder.com/40",
      content: newComment,
      createdAt: new Date().toISOString()
    }
    console.log(newCommentObj);
    console.log(postId);

    fetch(`http://localhost:5000/api/forumposts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify(newCommentObj),
      })
      .then(response => {
        window.location.reload();
        response.json();
      })
  }

  return (
    <div className="forum-page-wrapper">
      <Navbar />
      <div className="forum-page">
        <div className="forum-header">
          <h1>Community Forum</h1>
          <p>Discuss properties, landlords, and find roommates in your area</p>
        </div>

        <div className="forum-actions">
          {isAuthenticated ? (
            <button
              className="create-post-button"
              onClick={() => setIsCreatingPost(!isCreatingPost)}
            >
              {isCreatingPost ? 'Cancel' : 'Create New Post'}
            </button>
          ) : (
            <p className="login-prompt">Please log in to create a post</p>
          )}
        </div>

        {isCreatingPost && (
          <div className="create-post-form">
            <h2>Create a New Post</h2>

            <div className="form-group">
              <label htmlFor="post-subject">Subject *</label>
              <input
                type="text"
                id="post-subject"
                value={newPostSubject}
                onChange={(e) => setNewPostSubject(e.target.value)}
                placeholder="Enter a descriptive subject"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="post-category">Category *</label>
              <select
                id="post-category"
                value={newPostCategory}
                onChange={(e) => setNewPostCategory(e.target.value)}
                required
              >
                <option value="forSublease">Looking for Sublease</option>
                <option value="toSublease">Looking to Sublease</option>
                <option value="landlord">Landlord</option>
                <option value="roommate">Roommate</option>
                <option value="general">General</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="post-content">Content *</label>
              <textarea
                id="post-content"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Share your experience, ask questions, or provide information"
                rows={5}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="post-image">Image (Optional)</label>
              <input
                type="file"
                id="post-image"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="image-preview-container">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview"
                  />
                  <button
                    className="remove-image-button"
                    onClick={() => {
                      setNewPostImage(null);
                      setImagePreview(null);
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <button className="submit-post-button" onClick={handleCreatePost}>
              Post
            </button>
          </div>
        )}

        <div className="forum-filters">
          <div className="filter-group">
            <label htmlFor="username-filter">Filter by Username:</label>
            <input
              type="text"
              id="username-filter"
              value={usernameFilter}
              onChange={(e) => setUsernameFilter(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="category-filter">Filter by Category:</label>
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="forSublease">Looking for Sublease</option>
              <option value="toSublease">Looking to Sublease</option>
              <option value="landlord">Landlord</option>
              <option value="roommate">Roommate</option>
              <option value="general">General</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="date-filter">Filter by Date:</label>
            <select
              id="date-filter"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="last-week">Last Week</option>
              <option value="last-month">Last Month</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort-by">Sort by:</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most-liked">Most Liked</option>
              <option value="most-commented">Most Comments</option>
            </select>
          </div>
        </div>

        <div className="posts-container">
          {loading ? (
            <div className="loading-message">Loading posts...</div>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="user-info">
                    <img
                      src={post.userAvatar}
                      alt={post.username}
                      className="user-avatar"
                    />
                    <div>
                      <span className="username">{post.username}</span>
                      <span className="post-date">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </div>
                  <span className={`category-badge ${post.category}`}>
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                </div>

                <h2 className="post-subject">{post.subject}</h2>

                <p className="post-content">{post.content}</p>

                {post.imageUrl && (
                  <div className="post-image-container">
                    <img
                      src={post.imageUrl}
                      alt="Post"
                      className="post-image"
                    />
                  </div>
                )}

                <div className="post-footer">
                  <div className="post-stats">
                    <span className="likes-count">
                      ❤️ {post.likes} {post.likes === 1 ? 'like' : 'likes'}
                    </span>
                    <span className="comments-count">
                      💬 {post.comments.length}{' '}
                      {post.comments.length === 1 ? 'comment' : 'comments'}
                    </span>
                  </div>
                  <button className="like-button">Like</button>
                </div>

                {post.comments.length > 0 && (
                  <div className="comments-section">
                    <h3>Comments</h3>
                    <div className="comments-list">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="comment">
                          <div className="comment-header">
                            <img
                              src={comment.userAvatar}
                              alt={comment.username}
                              className="comment-avatar"
                            />
                            <div>
                              <span className="comment-username">
                                {comment.username}
                              </span>
                              <span className="comment-date">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                          </div>
                          <p className="comment-content">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isAuthenticated && (
                  <div className="add-comment-form">
                    <input
                      placeholder="Write a comment..."
                      className="comment-input"
                      onChange={(e) => {setNewComment(e.target.value)}}
                    ></input>
                    <button className="comment-button" onClick={() => handleNewComment(post.id)}>Comment</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-posts-message">
              No posts found matching your filters. Try adjusting your search criteria.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForumPage;
