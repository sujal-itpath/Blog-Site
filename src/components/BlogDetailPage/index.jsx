import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBlogByIdQuery } from '../../redux/api/blogApiSlice';
import { useSelector } from 'react-redux';
import { selectAuthors } from '../../redux/api/authorSlice';
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Divider,
  CircularProgress,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

// Helper function to get author for a blog
const getAuthorForBlog = (blogId, authors) => {
  if (!authors?.length) return null;
  const index = Math.abs(blogId) % authors.length;
  return authors[index];
};

// Helper function to get local blog
const getLocalBlog = (id) => {
  const localBlogs = JSON.parse(localStorage.getItem('localBlogs') || '[]');
  return localBlogs.find(blog => blog.id === parseInt(id));
};

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const authors = useSelector(selectAuthors);
  const [localBlog, setLocalBlog] = useState(null);
  const [isLocalBlog, setIsLocalBlog] = useState(false);
  
  // Only fetch from API if it's not a local blog
  const { data: apiBlog, isLoading: isLoadingApi, error: apiError } = useGetBlogByIdQuery(
    parseInt(id) <= 100 ? id : null
  );
  
  const [comments, setComments] = React.useState([]);
  const [loadingComments, setLoadingComments] = React.useState(true);

  useEffect(() => {
    // Check if this is a local blog
    const blogId = parseInt(id);
    if (blogId > 100) {
      const blog = getLocalBlog(id);
      setLocalBlog(blog);
      setIsLocalBlog(true);
    }
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [id]);

  // Show loading state only for API blogs
  if (!isLocalBlog && isLoadingApi) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  // Show error state only for API blogs
  if (!isLocalBlog && apiError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">Error loading blog post</Typography>
      </Box>
    );
  }

  // Get the blog data from either source
  const blog = isLocalBlog ? localBlog : apiBlog;

  if (!blog) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography>Blog post not found</Typography>
      </Box>
    );
  }

  // Get author info from the authorSlice
  const authorInfo = getAuthorForBlog(blog.id, authors);
  const authorName = blog.author || authorInfo?.name || "Anonymous";
  const authorImage = authorInfo?.image || `https://i.pravatar.cc/150?img=${blog.id % 10 + 1}`;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/blog')}
        sx={{ mb: 4 }}
      >
        Back to Blogs
      </Button>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {blog.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar
              src={authorImage}
              alt={authorName}
              sx={{ width: 40, height: 40 }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {authorName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(blog.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <Chip
                label={blog.category || 'General'}
                color="primary"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  height: '24px',
                  '& .MuiChip-label': {
                    px: 1.5,
                  },
                }}
              />
            </Box>
          </Box>

          <Box
            component="img"
            src={blog.image || `https://picsum.photos/seed/${blog.id}/800/400`}
            alt={blog.title}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: 2,
              mb: 4,
            }}
          />

          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
            {blog.body}
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h5" gutterBottom>
            Comments
          </Typography>
          
          {loadingComments ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : comments.length > 0 ? (
            <List>
              {comments.map((comment) => (
                <ListItem key={comment.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={comment.name} src={`https://i.pravatar.cc/150?img=${comment.id % 10 + 1}`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography component="span" variant="subtitle2" color="text.primary">
                        {comment.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{ display: 'block', mb: 1 }}
                        >
                          {comment.email}
                        </Typography>
                        {comment.body}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No comments yet
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogDetailPage;
