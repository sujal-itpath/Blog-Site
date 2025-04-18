import React from 'react';
import { Box, Button, Typography, Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ 
  page, 
  totalPages, 
  onPageChange 
}) => {
  const handleChange = (event, value) => {
    onPageChange(event, value);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
      <MuiPagination 
        count={totalPages} 
        page={page} 
        onChange={handleChange} 
        color="primary" 
        size="large"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default Pagination; 