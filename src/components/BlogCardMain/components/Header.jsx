import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const Header = ({ onNavigateToCreate }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 6,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "2rem", md: "2.5rem" },
          color: "primary.main",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -8,
            left: 0,
            width: "60%",
            height: "4px",
            backgroundColor: "primary.light",
            borderRadius: 2,
          },
        }}
      >
        Explore Blogs
      </Typography>

      <Box sx={{ flexGrow: 1 }} />

      <Button
        variant="contained"
        size="large"
        onClick={onNavigateToCreate}
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: 2,
          fontSize: "1.1rem",
          fontWeight: 600,
          textTransform: "none",
          boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          },
        }}
      >
        Create Blog
      </Button>
    </Box>
  );
};

export default Header; 