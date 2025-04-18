import React from 'react';
import { Box } from '@mui/material';
import BlogCard from '../BlogCard';

const BlogList = ({ blogs, onEdit, onDelete }) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
      {blogs && blogs.map((blog, index) => (
        <BlogCard 
          key={blog.id}
          blog={blog}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
};

export default BlogList; 