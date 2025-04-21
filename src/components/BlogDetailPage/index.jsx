import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthor } from '../../context/AuthorContext';
import { useBlog } from '../../context/BlogContext';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authors } = useAuthor();
  const { getBlogById } = useBlog();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        const blogData = await getBlogById(id);
        
        if (blogData) {
          setBlog(blogData);
        } else {
          setError('Blog not found');
        }
      } catch (err) {
        setError('Failed to fetch blog');
        console.error('Error fetching blog:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id, getBlogById]);

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

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !blog) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">{error || 'Blog not found'}</Typography>
      </Box>
    );
  }

  // Get author info from the AuthorContext
  const authorInfo = authors.find(author => author.name === blog.author) || authors[blog.userId % authors.length];
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
            src={blog.imageUrl || blog.image || `https://picsum.photos/seed/${blog.id}/800/400`}
            alt={blog.title}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: 2,
              mb: 4,
              display: 'block',
              margin: '0 auto',
            }}
            onError={(e) => {
              e.target.src = `https://picsum.photos/seed/${blog.id}/800/400`;
            }}
          />

          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
            {blog.body 
              ? blog.body.replace(/<[^>]*>/g, '')
                .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
              : blog.content 
                ? blog.content.replace(/<[^>]*>/g, '')
                  .replace(/&nbsp;/g, ' ')
                  .replace(/&amp;/g, '&')
                  .replace(/&lt;/g, '<')
                  .replace(/&gt;/g, '>')
                  .replace(/&quot;/g, '"')
                  .replace(/&#39;/g, "'")
                : 'No content available'}
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
