/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { useAuthor } from '../../context/AuthorContext';

const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

const BlogCards = () => {
  const navigate = useNavigate();
  const itemsPerPage = 3;
  const { authors } = useAuthor();
  const { blogs, loading } = useBlog();

  const handleCardClick = () => {
    navigate('/blog');
  };

  const getAuthorByUserId = (userId) => {
    // Map userId (1-20) to author index (0-19)
    const index = Math.abs(userId - 1) % authors.length;
    return authors[index];
  };

  const trendingBlogs = useMemo(() => {
    if (!Array.isArray(blogs)) return [];
    
    // Filter out local blogs and only keep API blogs
    const apiBlogs = blogs.filter(blog => !blog.isLocal);
    
    return [...apiBlogs]
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, itemsPerPage)
      .map((blog, index) => {
        // Assign a random userId between 1 and 20 for each blog
        const randomUserId = Math.floor(Math.random() * 20) + 1;
        const author = getAuthorByUserId(randomUserId);
        return {
          ...blog,
          userId: randomUserId,
          image: blog.image || `https://picsum.photos/seed/${blog.id}/400/300`,
          title: blog.title || 'Untitled',
          body: blog.body || 'No description provided...',
          authorName: author.name,
          authorImage: author.image,
          date: new Date(blog.publishDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          readTime: '4 min read',
        };
      });
  }, [blogs, authors]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-12 px-6 md:px-16 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-14">
          <h2 className="text-3xl font-bold text-gray-800">Trending Blogs</h2>
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate('/blog')}
            sx={{
              bgcolor: '#7e3ff2',
              textTransform: 'none',
              '&:hover': { bgcolor: '#6b2bd9' }
            }}
          >
            See All Blogs
          </Button>
        </div>

        <div className="flex flex-wrap justify-between gap-y-10">
          {trendingBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              variants={floatVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="max-w-xs w-full cursor-pointer"
              onClick={handleCardClick}
            >
              <Card className="rounded-xl overflow-hidden shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm min-h-[420px] flex flex-col justify-between">
                <Box className="relative h-56 group overflow-hidden">
                  <CardMedia
                    component="img"
                    image={blog.image}
                    alt={blog.title}
                    className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-120"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </Box>

                <CardContent className="p-5 flex flex-col flex-grow">
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-800 mb-2 text-base line-clamp-2"
                  >
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-gray-600 mb-4 text-sm line-clamp-2"
                  >
                    {blog.body}
                  </Typography>

                  <Box className="flex items-center justify-between border-t border-gray-200 pt-4 mt-auto">
                    <Box className="flex items-center gap-2">
                      <img
                        src={blog.authorImage}
                        alt={blog.authorName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <Typography variant="caption" className="text-gray-500">
                        {blog.authorName}
                      </Typography>
                    </Box>
                    <Box className="flex items-center gap-2">
                      <Typography variant="caption" className="text-gray-500">
                        {blog.date}
                      </Typography>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <Typography variant="caption" className="text-purple-600 font-medium">
                        {blog.readTime}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogCards;
