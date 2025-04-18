import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthors } from '../../redux/api/authorSlice';

export const useBlogCard = (blog, index, onEdit, onDelete) => {
  const navigate = useNavigate();
  const authors = useSelector(selectAuthors);
  
  // Get a random author index based on the blog ID
  const authorIndex = blog.id ? parseInt(blog.id) % authors.length : index % authors.length;
  const author = authors[authorIndex];
  
  // Format author information - prioritize the author name from the blog
  const authorName = blog.author || author?.name || blog.authorInfo?.name || "Anonymous";
  const authorImage = author?.image || blog.authorInfo?.image || `https://i.pravatar.cc/150?img=${index + 5}`;
  
  // Format date
  const publishDate = new Date(blog.publishDate || blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  // Format other blog details
  const readTime = blog.readTime || "4 min read";
  const category = blog.category || "General";
  const image = blog.image || `https://picsum.photos/seed/${blog.id}/800/400`;

  // Handle blog click
  const handleBlogClick = () => {
    navigate(`/blog/${blog.id}`);
  };

  // Handle edit click
  const handleEditClick = (e, blog) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(blog);
  };

  // Handle delete click
  const handleDeleteClick = (e, blog) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(blog);
  };

  return {
    authorName,
    authorImage,
    publishDate,
    readTime,
    category,
    image,
    handleBlogClick,
    handleEditClick,
    handleDeleteClick
  };
}; 