import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Helper functions for localStorage
const getLocalBlogs = () => {
  const blogs = localStorage.getItem('localBlogs');
  return blogs ? JSON.parse(blogs) : [];
};

const saveLocalBlogs = (blogs) => {
  localStorage.setItem('localBlogs', JSON.stringify(blogs));
};

// Helper function to get random category
const getRandomCategory = (categories) => {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
};

// Helper function to get random date within last 30 days
const getRandomDate = () => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
  const randomTime = thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime());
  return new Date(randomTime).toISOString();
};

// Helper function to ensure date is not in the future
const ensureValidDate = (date) => {
  const now = new Date();
  const inputDate = new Date(date);
  return inputDate > now ? now.toISOString() : date;
};

// Predefined categories for API blogs
const defaultCategories = [
  'Technology',
  'Travel',
  'Food',
  'Health',
  'Business',
  'Entertainment',
  'Science',
  'Lifestyle',
  'Education',
  'Sports'
];

const getUniqueImageUrl = (id) => {
  return `https://picsum.photos/seed/${id}/800/400`;
};

const transformBlog = (post) => ({
  id: post.id,
  title: post.title,
  body: post.body,
  userId: post.userId,
  publishDate: ensureValidDate(getRandomDate()),
  category: getRandomCategory(defaultCategories),
  image: getUniqueImageUrl(post.id),
});

export const blogApi = {
  getBlogs: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/posts`);
      const apiBlogs = response.data.map(transformBlog);
      const localBlogs = getLocalBlogs();
      return [...apiBlogs, ...localBlogs];
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return getLocalBlogs();
    }
  },

  getBlogById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${id}`);
      return transformBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      const localBlogs = getLocalBlogs();
      return localBlogs.find(blog => blog.id === id);
    }
  },

  createBlog: async (blog) => {
    try {
      const response = await axios.post(`${BASE_URL}/posts`, {
        title: blog.title,
        body: blog.body,
        userId: 1,
      });
      
      const newBlog = {
        ...transformBlog(response.data),
        publishDate: new Date().toISOString(),
        category: blog.category || getRandomCategory(defaultCategories),
        image: blog.image || getUniqueImageUrl(response.data.id),
      };

      const localBlogs = getLocalBlogs();
      saveLocalBlogs([...localBlogs, newBlog]);
      return newBlog;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  updateBlog: async (id, blog) => {
    try {
      const response = await axios.put(`${BASE_URL}/posts/${id}`, {
        id: id,
        title: blog.title,
        body: blog.body,
        userId: blog.userId || 1,
      });

      const updatedBlog = {
        ...transformBlog(response.data),
        publishDate: blog.publishDate || new Date().toISOString(),
        category: blog.category || getRandomCategory(defaultCategories),
        image: blog.image || getUniqueImageUrl(id),
      };

      const localBlogs = getLocalBlogs();
      const updatedLocalBlogs = localBlogs.map(b => 
        b.id === id ? updatedBlog : b
      );
      saveLocalBlogs(updatedLocalBlogs);
      return updatedBlog;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  deleteBlog: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/posts/${id}`);
      const localBlogs = getLocalBlogs();
      const updatedLocalBlogs = localBlogs.filter(blog => blog.id !== id);
      saveLocalBlogs(updatedLocalBlogs);
      return { id };
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  },
}; 