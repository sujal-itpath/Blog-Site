/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Container, Grid, Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useBlogCardMain from "./useBlogCardMain";
import AddIcon from "@mui/icons-material/Add";

// Import components
import Header from "./components/Header";
import SearchAndFilter from "./components/SearchAndFilter";
import CategoryFilterModal from "./components/CategoryFilterModal";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog";
import BlogCard from "./BlogCard";
import Pagination from "./components/Pagination";
import LoadingSpinner from "./components/LoadingSpinner";

// Main Component
const BlogCardMain = () => {
  const {
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
    allBlogs,

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
  } = useBlogCardMain();

  // ===== EFFECTS =====
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we need to refresh the data
    if (location.state?.refresh) {
      // Clear the refresh state to prevent unnecessary refreshes
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // ===== RENDER =====
  if (isLoadingBlogs) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Header onNavigateToCreate={() => navigate('/create-blog')} />
      
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onFilterClick={handleFilterModalOpen}
        selectedCategory={selectedCategory}
        onClearCategory={handleClearCategory}
      />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {paginatedBlogs.map((blog, index) => (
          <Grid key={blog.id} xs={12} sm={6} md={4}>
            <BlogCard
              blog={blog}
              index={index}
              onEdit={handleEditBlog}
              onDelete={handleDeleteClick}
            />
          </Grid>
        ))}
      </Grid>

      {paginatedBlogs.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No blogs found. Try adjusting your search or filters.
          </Typography>
        </Box>
      )}

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <CategoryFilterModal
        open={isFilterModalOpen}
        onClose={handleFilterModalClose}
        onSelectCategory={handleCategorySelect}
        selectedCategory={selectedCategory}
        categories={Array.from(new Set(allBlogs.map(blog => blog.category).filter(Boolean)))}
        onClearFilters={handleClearCategory}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => {
          handleFilterModalClose();
          handleDeleteClick(null);
        }}
        onConfirm={handleDeleteConfirm}
        blogToDelete={blogToDelete}
      />
    </Container>
  );
};

export default BlogCardMain;
