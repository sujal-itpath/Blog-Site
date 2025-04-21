import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Divider,
  Button,
} from '@mui/material';

const CategoryFilterModal = ({ 
  open, 
  onClose, 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  onClearFilters 
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      disablePortal
      keepMounted={false}
    >
      <DialogTitle>Filter by Category</DialogTitle>
      <Divider />
      <DialogContent>
        <List sx={{ width: '100%' }}>
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <ListItem 
                key={category}
                button
                onClick={() => onSelectCategory(category)}
                selected={category === selectedCategory}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={category === selectedCategory}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={category} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No categories available" />
            </ListItem>
          )}
        </List>
      </DialogContent>
      
    </Dialog>
  );
};

export default CategoryFilterModal; 