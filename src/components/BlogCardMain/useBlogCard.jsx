import { useNavigate } from 'react-router-dom';
import { useAuthor } from '../../context/AuthorContext';

const useBlogCard = (blog) => {
  const navigate = useNavigate();
  const { authors } = useAuthor();

  // Find author from context based on author name or ID
  const findAuthor = () => {
    if (blog.authorId) {
      return authors.find(author => author.id === blog.authorId);
    }
    if (blog.author) {
      return authors.find(author => author.name === blog.author);
    }
    return null;
  };

  const author = findAuthor();
  
  const authorInfo = authors.find(author => author.name === blog.author) || authors[blog.userId % authors.length];
  const authorName = authorInfo?.name || blog.author || "Anonymous";
  const authorImage = authorInfo?.image || blog.authorImage || `https://i.pravatar.cc/150?img=${blog.id % 10 + 1}`;

  // Get random image if not provided
  const getRandomImage = () => {
    return `https://picsum.photos/seed/${blog.id}/800/400`;
  };

  const image = blog.imageUrl || blog.image || getRandomImage();
  
  // Format publish date
  const publishDate = new Date(blog.publishDate || blog.createdAt || new Date()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate read time based on content length
  const contentLength = (blog.body || blog.content || '').length;
  const readTime = Math.max(1, Math.ceil(contentLength / 500)) + ' min read';

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate('/create-blog', { state: { blogToEdit: blog } });
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    // This will be handled by the parent component
  };

  return {
    image,
    authorName,
    authorImage,
    publishDate,
    readTime,
    category: blog.category || 'General',
    handleEditClick,
    handleDeleteClick,
  };
};

export default useBlogCard; 