import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

const DeleteConfirmationDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  blogToDelete 
}) => {
  const handleConfirm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onConfirm();
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      disablePortal
      keepMounted={false}
      onClick={(e) => e.stopPropagation()}
      PaperProps={{
        onClick: (e) => e.stopPropagation(),
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <DialogTitle id="delete-dialog-title" sx={{ pb: 1 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          <Typography id="delete-dialog-description">
            Are you sure you want to delete "{blogToDelete?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2 }}>
          <Button 
            onClick={handleClose} 
            color="primary"
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            color="error" 
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DeleteConfirmationDialog; 