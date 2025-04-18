/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

export const blogApiSlice = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://jsonplaceholder.typicode.com',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ['Blog'],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: 'posts',
        method: 'GET',
      }),
      providesTags: ['Blog'],
      transformResponse: (response) => {
        return response.map(post => ({
          id: post.id,
          title: post.title,
          body: post.body,
          userId: post.userId,
          publishDate: ensureValidDate(getRandomDate()),
          category: getRandomCategory(defaultCategories),
          image: getUniqueImageUrl(post.id),
        }));
      },
    }),
    getBlogById: builder.query({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
      transformResponse: (response) => {
        return {
          id: response.id,
          title: response.title,
          body: response.body,
          userId: response.userId,
          publishDate: ensureValidDate(getRandomDate()),
          category: getRandomCategory(defaultCategories),
          image: getUniqueImageUrl(response.id),
        };
      },
    }),
    createBlog: builder.mutation({
      query: (blog) => ({
        url: 'posts',
        method: 'POST',
        body: {
          title: blog.title,
          body: blog.body,
          userId: 1,
        },
      }),
      invalidatesTags: ['Blog'],
      transformResponse: (response, meta, blog) => {
        return {
          id: response.id,
          title: response.title,
          body: response.body,
          userId: response.userId,
          publishDate: new Date().toISOString(), // Current date for new blogs
          category: blog.category || getRandomCategory(defaultCategories),
          image: blog.image || getUniqueImageUrl(response.id),
        };
      },
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...blog }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: {
          id: id,
          title: blog.title,
          body: blog.body,
          userId: blog.userId || 1,
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Blog', id }],
      transformResponse: (response) => {
        return {
          id: response.id,
          title: response.title,
          body: response.body,
          userId: response.userId,  
          publishDate: blog.publishDate || new Date().toISOString(),
          category: blog.category || getRandomCategory(defaultCategories),
          image: blog.image || getUniqueImageUrl(response.id),
        };
      },
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
      transformResponse: (response, meta, arg) => {
        return { id: arg };
      },
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApiSlice;