// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [isLoading, setIsLoading] = useState(false);

  // Google login function using the new library
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setIsLoading(true);
      try {
        // Get user profile with the access token
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, 
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: 'application/json'
            }
          }
        );
        
        const userData = await response.json();
        
        // Add the access token to the user data
        userData.token = codeResponse.access_token;
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Update state
        setUser(userData);
        setIsAuthenticated(true);
        console.log("User logged in:", userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    }
  });

  // Logout function
  const logout = () => {
    googleLogout();
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const contextValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;