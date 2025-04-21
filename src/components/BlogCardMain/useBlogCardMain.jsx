import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { filterBlogs, sortBlogsByDate } from './utils';

const useBlogCardMain = () => {
  const navigate = useNavigate();
  const { blogs, deleteBlog } = useBlog();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);

  // Filter and sort blogs
  const filteredBlogs = filterBlogs(blogs, searchTerm, selectedCategory);
  const sortedBlogs = sortBlogsByDate(filteredBlogs);

  // Pagination
  const blogsPerPage = 9;
  const totalPages = Math.ceil(sortedBlogs.length / blogsPerPage);
  const paginatedBlogs = sortedBlogs.slice(
    (page - 1) * blogsPerPage,
    page * blogsPerPage
  );

  // Event Handlers
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsFilterModalOpen(false);
    setPage(1); // Reset to first page when changing category
  };

  const handleFilterModalOpen = () => {
    setIsFilterModalOpen(true);
  };

  const handleFilterModalClose = () => {
    setIsFilterModalOpen(false);
  };

  const handleEditBlog = (blog) => {
    navigate('/create-blog', { state: { blogToEdit: blog } });
  };

  const handleDeleteClick = (blogId) => {
    if (blogId === null) {
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    } else {
      const blog = blogs.find(b => b.id === blogId);
      setBlogToDelete(blog);
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (blogToDelete) {
      try {
        await deleteBlog(blogToDelete.id);
        setDeleteDialogOpen(false);
        setBlogToDelete(null);
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleClearCategory = () => {
    setSelectedCategory('');
    setPage(1);
  };

  // Set loading state
  useEffect(() => {
    setIsLoadingBlogs(false);
  }, [blogs]);

  return {
    // State
    page,
    searchTerm,
    selectedCategory,
    isFilterModalOpen,
    deleteDialogOpen,
    blogToDelete,
    isLoadingBlogs,

    // Data
    paginatedBlogs,
    totalPages,
    allBlogs: blogs,

    // Event Handlers
    handleSearchChange,
    handleCategorySelect,
    handleFilterModalOpen,
    handleFilterModalClose,
    handleEditBlog,
    handleDeleteClick,
    handleDeleteConfirm,
    handlePageChange,
    handleClearCategory,
  };
};

export default useBlogCardMain; 