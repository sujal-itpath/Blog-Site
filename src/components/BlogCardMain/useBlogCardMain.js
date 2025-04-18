import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetBlogsQuery, useDeleteBlogMutation } from '../../redux/api/blogApiSlice';
import { 
  getLocalBlogs, 
  saveLocalBlogs, 
  getDeletedBlogIds,
  saveDeletedBlogIds,
  filterBlogs, 
  sortBlogsByDate, 
  getPaginatedBlogs 
} from './utils';
import { blogApiSlice } from '../../redux/api/blogApiSlice';

const useBlogCardMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // State
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [deletedBlogIds, setDeletedBlogIds] = useState(getDeletedBlogIds());

  // API Queries
  const { data: apiBlogs = [], isLoading: isLoadingBlogs, error, refetch } = useGetBlogsQuery(undefined, {
    refetchOnMountOrArgChange: false, // Disable automatic refetching
    pollingInterval: 0, // Disable polling
  });

  const [deleteBlog] = useDeleteBlogMutation();

  // Get local blogs from localStorage
  const localBlogs = useMemo(() => {
    const blogs = getLocalBlogs();
    console.log('Local blogs from localStorage:', blogs);
    return blogs;
  }, []);

  // Combine API and local blogs
  const combinedBlogs = useMemo(() => {
    if (!apiBlogs) return localBlogs;
    
    // Create a map of API blogs by ID for quick lookup
    const apiBlogsMap = new Map(apiBlogs.map(blog => [blog.id, blog]));
    
    // Add local blogs that don't exist in API response
    const allBlogs = [...apiBlogs];
    localBlogs.forEach(localBlog => {
      if (!apiBlogsMap.has(localBlog.id)) {
        allBlogs.push(localBlog);
      }
    });
    
    // Filter out deleted blogs
    const filteredBlogs = allBlogs.filter(blog => !deletedBlogIds.includes(blog.id));
    
    console.log('Combined blogs:', {
      apiBlogs: apiBlogs.length,
      localBlogs: localBlogs.length,
      combined: filteredBlogs.length,
      deleted: deletedBlogIds.length
    });
    
    return filteredBlogs;
  }, [apiBlogs, localBlogs, deletedBlogIds]);

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    return filterBlogs(combinedBlogs, searchTerm, selectedCategory);
  }, [combinedBlogs, searchTerm, selectedCategory]);

  const sortedBlogs = useMemo(() => {
    return sortBlogsByDate(filteredBlogs);
  }, [filteredBlogs]);

  // Pagination
  const itemsPerPage = 9;
  const totalPages = Math.max(1, Math.ceil(sortedBlogs.length / itemsPerPage));
  
  // Ensure page is within valid range
  const currentPage = Math.min(Math.max(1, page), totalPages);
  
  const paginatedBlogs = useMemo(() => {
    return getPaginatedBlogs(sortedBlogs, currentPage, itemsPerPage);
  }, [sortedBlogs, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory]);

  // Log for debugging
  useEffect(() => {
    console.log('API Blogs:', apiBlogs.length);
    console.log('Local Blogs:', localBlogs.length);
    console.log('Combined Blogs:', combinedBlogs.length);
    console.log('Filtered Blogs:', filteredBlogs.length);
    console.log('Paginated Blogs:', paginatedBlogs.length);
    console.log('Current Page:', currentPage);
    console.log('Total Pages:', totalPages);
  }, [apiBlogs, localBlogs, combinedBlogs, filteredBlogs, paginatedBlogs, currentPage, totalPages]);

  // Refetch data when location state changes
  // useEffect(() => {
  //   if (location.state?.refresh && !location.state?.skipApiCalls) {
  //     refetch();
  //   }
  // }, [location.state, refetch]);

  // Event Handlers
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleClearCategory = () => {
    setSelectedCategory('');
  };

  const handleFilterModalOpen = () => {
    setIsFilterModalOpen(true);
  };

  const handleFilterModalClose = () => {
    setIsFilterModalOpen(false);
    setDeleteDialogOpen(false);
  };

  const handleEditBlog = (blog) => {
    navigate('/create-blog', { 
      state: { 
        blogToEdit: blog,
        skipApiCalls: true // Add this flag to prevent API calls
      } 
    });
  };

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;

    try {
      // Delete from API if it's an API blog (not a local blog)
      if (!blogToDelete.isLocal) {
        await deleteBlog(blogToDelete.id).unwrap();
      }

      // Update local storage by removing the blog
      const updatedLocalBlogs = localBlogs.filter(blog => blog.id !== blogToDelete.id);
      saveLocalBlogs(updatedLocalBlogs);

      // Add to deletedBlogIds and save to localStorage
      const updatedDeletedBlogIds = [...deletedBlogIds, blogToDelete.id];
      setDeletedBlogIds(updatedDeletedBlogIds);
      saveDeletedBlogIds(updatedDeletedBlogIds);

      // Update the Redux cache to remove the blog
      dispatch(
        blogApiSlice.util.updateQueryData('getBlogs', undefined, (draft) => {
          const index = draft.findIndex(blog => blog.id === blogToDelete.id);
          if (index !== -1) {
            draft.splice(index, 1);
          }
        })
      );
      
      // Adjust page if necessary
      if (paginatedBlogs.length === 1 && currentPage > 1) {
        setPage(currentPage - 1);
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
      // Don't show alert, just log the error
    } finally {
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return {
    // State
    page: currentPage,
    searchTerm,
    selectedCategory,
    isFilterModalOpen,
    deleteDialogOpen,
    blogToDelete,
    isLoadingBlogs,
    error,

    // Data
    paginatedBlogs,
    totalPages,
    allBlogs: combinedBlogs,

    // Event Handlers
    handleSearchChange,
    handleCategorySelect,
    handleClearCategory,
    handleFilterModalOpen,
    handleFilterModalClose,
    handleEditBlog,
    handleDeleteClick,
    handleDeleteConfirm,
    handlePageChange,
  };
};

export default useBlogCardMain; 