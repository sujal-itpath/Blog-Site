import React, { createContext, useContext, useState, useEffect } from 'react';
import { blogApi } from './api/blogApi';

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs from API and combine with local blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      // Get local blogs
      const localBlogs = JSON.parse(localStorage.getItem('localBlogs') || '[]');
      
      // Get API blogs
      const apiBlogs = await blogApi.getBlogs();
      
      // Combine and sort blogs
      const allBlogs = [...localBlogs, ...apiBlogs].sort((a, b) => 
        new Date(b.publishDate || b.createdAt) - new Date(a.publishDate || a.createdAt)
      );
      
      setBlogs(allBlogs);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load blogs on mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const createBlog = async (blogData) => {
    try {
      setLoading(true);
      const newBlog = {
        ...blogData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        publishDate: new Date().toISOString(),
        isLocal: true
      };

      // Save to local storage
      const localBlogs = JSON.parse(localStorage.getItem('localBlogs') || '[]');
      localStorage.setItem('localBlogs', JSON.stringify([newBlog, ...localBlogs]));

      // Update state
      setBlogs(prevBlogs => [newBlog, ...prevBlogs]);
      return newBlog;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateBlog = async (blogId, updatedData) => {
    try {
      setLoading(true);
      const blog = blogs.find(b => b.id === blogId);
      
      if (blog?.isLocal) {
        // Update local blog
        const updatedBlog = { ...blog, ...updatedData };
        const localBlogs = JSON.parse(localStorage.getItem('localBlogs') || '[]');
        const updatedLocalBlogs = localBlogs.map(b => 
          b.id === blogId ? updatedBlog : b
        );
        localStorage.setItem('localBlogs', JSON.stringify(updatedLocalBlogs));
        setBlogs(prevBlogs => prevBlogs.map(b => b.id === blogId ? updatedBlog : b));
        return updatedBlog;
      } else {
        // Update API blog
        const updatedBlog = await blogApi.updateBlog(blogId, updatedData);
        setBlogs(prevBlogs => prevBlogs.map(b => b.id === blogId ? updatedBlog : b));
        return updatedBlog;
      }
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      setLoading(true);
      const blog = blogs.find(b => b.id === blogId);
      
      if (blog?.isLocal) {
        // Delete local blog
        const localBlogs = JSON.parse(localStorage.getItem('localBlogs') || '[]');
        const updatedLocalBlogs = localBlogs.filter(b => b.id !== blogId);
        localStorage.setItem('localBlogs', JSON.stringify(updatedLocalBlogs));
      } else {
        // Delete API blog
        await blogApi.deleteBlog(blogId);
      }
      
      // Update state
      setBlogs(prevBlogs => prevBlogs.filter(b => b.id !== blogId));
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getBlogById = async (blogId) => {
    try {
      // Check local blogs first
      const localBlogs = JSON.parse(localStorage.getItem('localBlogs') || '[]');
      const localBlog = localBlogs.find(blog => blog.id === blogId);
      
      if (localBlog) {
        return localBlog;
      }
      
      // If not found locally, try API
      const blog = await blogApi.getBlogById(blogId);
      return blog;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const value = {
    blogs,
    loading,
    error,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById,
    refetchBlogs: fetchBlogs
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext; 