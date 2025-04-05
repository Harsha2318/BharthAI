// src/utils/auth.js

// User authentication state
let currentUser = JSON.parse(localStorage.getItem('user')) || null;

// Authentication functions
export const auth = {
  // Check if user is logged in
  isAuthenticated: () => {
    return !!currentUser;
  },
  
  // Get current user
  getCurrentUser: () => {
    return currentUser;
  },
  
  // Login
  login: async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        currentUser = data.user;
        localStorage.setItem('user', JSON.stringify(currentUser));
        return { success: true, user: currentUser };
      }
      
      return { success: false, message: data.message || 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error' };
    }
  },
  
  // Signup
  signup: async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        currentUser = data.user;
        localStorage.setItem('user', JSON.stringify(currentUser));
        return { success: true, user: currentUser };
      }
      
      return { success: false, message: data.message || 'Signup failed' };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Network error' };
    }
  },
  
  // Logout
  logout: () => {
    currentUser = null;
    localStorage.removeItem('user');
  }
};