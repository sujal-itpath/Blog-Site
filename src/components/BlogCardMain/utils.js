/**
 * Get blogs from local storage
 * @returns {Array} Array of blogs from local storage
 */
export const getLocalBlogs = () => {
  const blogs = localStorage.getItem('localBlogs');
  return blogs ? JSON.parse(blogs) : [];
};

/**
 * Save blogs to local storage
 * @param {Array} blogs - Array of blogs to save
 */
export const saveLocalBlogs = (blogs) => {
  localStorage.setItem('localBlogs', JSON.stringify(blogs));
};

/**
 * Get deleted blog IDs from local storage
 * @returns {Array} Array of deleted blog IDs
 */
export const getDeletedBlogIds = () => {
  const ids = localStorage.getItem('deletedBlogIds');
  return ids ? JSON.parse(ids) : [];
};

/**
 * Save deleted blog IDs to local storage
 * @param {Array} ids - Array of deleted blog IDs
 */
export const saveDeletedBlogIds = (ids) => {
  localStorage.setItem('deletedBlogIds', JSON.stringify(ids));
};

/**
 * Filter blogs based on search term and category
 * @param {Array} blogs - Array of blogs to filter
 * @param {string} searchTerm - Search term to filter by
 * @param {string} selectedCategory - Category to filter by
 * @returns {Array} Filtered blogs
 */
export const filterBlogs = (blogs, searchTerm, selectedCategory) => {
  if (!blogs || !Array.isArray(blogs)) return [];
  
  // Get deleted blog IDs
  const deletedBlogIds = getDeletedBlogIds();
  
  return blogs.filter(blog => {
    // Skip deleted blogs
    if (deletedBlogIds.includes(blog.id)) return false;
    
    // Apply search and category filters
    const matchesSearch = !searchTerm || 
                        (blog.title && blog.title.toLowerCase().includes(searchTerm.toLowerCase())) || 
                        (blog.body && blog.body.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
};

/**
 * Sort blogs by date
 * @param {Array} blogs - Array of blogs to sort
 * @returns {Array} Sorted blogs
 */
export const sortBlogsByDate = (blogs) => {
  if (!blogs || !Array.isArray(blogs)) return [];
  
  return [...blogs].sort((a, b) => {
    // Ensure dates are valid and not in the future
    const now = new Date();
    const dateA = new Date(a.publishDate || a.createdAt || new Date());
    const dateB = new Date(b.publishDate || b.createdAt || new Date());
    
    // If either date is in the future, use current date
    const validDateA = dateA > now ? now : dateA;
    const validDateB = dateB > now ? now : dateB;
    
    return validDateB - validDateA; // Sort in descending order (newest first)
  });
};

/**
 * Get paginated blogs
 * @param {Array} blogs - Array of blogs to paginate
 * @param {number} page - Current page
 * @param {number} itemsPerPage - Number of items per page
 * @returns {Array} Paginated blogs
 */
export const getPaginatedBlogs = (blogs, page, itemsPerPage) => {
  if (!blogs || !Array.isArray(blogs)) return [];
  
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return blogs.slice(startIndex, endIndex);
}; 