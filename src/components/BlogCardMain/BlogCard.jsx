import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useBlogCard } from './useBlogCard';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
  hover: {
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const BlogCard = ({ blog, index, onEdit, onDelete }) => {
  const {
    authorName,
    authorImage,
    publishDate,
    readTime,
    category,
    image,
    handleBlogClick,
    handleEditClick,
    handleDeleteClick
  } = useBlogCard(blog, index, onEdit, onDelete);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        custom={index}
        className="w-full"
        style={{ maxWidth: '350px', margin: '0 auto' }}
      >
        <Card
          onClick={handleBlogClick}
          className="w-full h-full cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md transition-all duration-300 flex flex-col hover:shadow-lg hover:-translate-y-1"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 440,
            position: 'relative',
            '&:hover .action-buttons': {
              opacity: 1,
            },
          }}
        >
          <Box className="relative h-56 group overflow-hidden">
            <CardMedia
              component="img"
              image={image}
              alt={blog.title}
              className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-120"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            
            {/* Action Buttons */}
            <Box 
              className="action-buttons"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                display: 'flex',
                gap: 1,
                opacity: 0,
                transition: 'opacity 0.3s ease',
                zIndex: 10,
              }}
            >
              <IconButton
                onClick={(e) => handleEditClick(e, blog)}
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  width: 36,
                  height: 36,
                  '&:hover': { 
                    bgcolor: 'rgba(255, 255, 255, 1)',
                    transform: 'scale(1.1)',
                  },
                  color: 'primary.main',
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={(e) => handleDeleteClick(e, blog)}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  width: 36,
                  height: 36,
                  '&:hover': { 
                    bgcolor: 'rgba(255, 255, 255, 1)',
                    transform: 'scale(1.1)',
                  },
                  color: 'error.main',
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Category Chip */}
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                zIndex: 10,
              }}
            >
              <Chip
                label={category}
                size="small"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  height: '24px',
                  '& .MuiChip-label': {
                    px: 1.5,
                  },
                  '&:hover': { 
                    bgcolor: 'primary.dark',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              />
            </Box>
          </Box>

          <CardContent className="p-5 flex flex-col flex-grow">
            <Typography
              variant="h6"
              className="font-semibold text-gray-800 mb-2 text-base"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {blog.title}
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-600 mb-4 text-sm"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
              dangerouslySetInnerHTML={{
                __html: blog.body
                  ? blog.body.replace(/<p>/g, '').replace(/<\/p>/g, ' ')
                  : "No description available..."
              }}
            />

            <Box className="flex flex-col justify-between gap-2 mt-auto">
              <Box className="flex items-center justify-between border-t border-gray-200 pt-4">
                <Box className="flex items-center gap-2">
                  <img
                    src={authorImage}
                    alt={authorName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <Typography
                    variant="caption"
                    className="text-gray-500"
                  >
                    {authorName}
                  </Typography>
                </Box>
                <Box className="flex items-center gap-2">
                  <Typography
                    variant="caption"
                    className="text-gray-500"
                  >
                    {publishDate}
                  </Typography>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <Typography
                    variant="caption"
                    className="text-purple-600 font-medium"
                  >
                    {readTime}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );
};

export default BlogCard; 