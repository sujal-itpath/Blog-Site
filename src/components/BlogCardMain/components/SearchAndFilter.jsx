import React from 'react';
import { Box, TextField, InputAdornment, IconButton, Chip } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';

const SearchAndFilter = ({ 
  searchTerm, 
  onSearchChange, 
  onFilterClick, 
  selectedCategory, 
  onClearCategory 
}) => {
  return (
    <>
      <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={onSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <IconButton
          onClick={onFilterClick}
          color={selectedCategory ? 'primary' : 'default'}
        >
          <FilterIcon />
        </IconButton>
      </Box>
      
      {selectedCategory && (
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={`Category: ${selectedCategory}`}
            onDelete={onClearCategory}
            color="primary"
          />
        </Box>
      )}
    </>
  );
};

export default SearchAndFilter; 