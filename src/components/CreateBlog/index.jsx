/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  TextField,
  Checkbox,
  Button,
  MenuItem,
  FormControlLabel,
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useBlog } from '../../context/BlogContext';
import { useAuthor } from '../../context/AuthorContext';

const categories = ['Technology', 'Travel', 'Food', 'Health', 'Business', 'Entertainment', 'Science', 'Lifestyle', 'Education', 'Sports'];

const CreateBlog = () => {
  const location = useLocation();
  const blogToEdit = location.state?.blogToEdit;
  const navigate = useNavigate();
  const { authors } = useAuthor();
  const { createBlog, updateBlog } = useBlog();
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    allowComments: true,
    image: null,
    category: 'Technology', // Default category
    publishDate: new Date().toISOString(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (blogToEdit) {
      setFormData({
        title: blogToEdit.title || "",
        content: blogToEdit.body || blogToEdit.content || "",
        author: blogToEdit.author || "",
        allowComments: blogToEdit.allowComments ?? true,
        image: null,
        category: blogToEdit.category || 'Technology',
        publishDate: blogToEdit.publishDate || new Date().toISOString(),
      });
    }
  }, [blogToEdit]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError(null);

    try {
      const selectedAuthor = authors.find(a => a.name === formData.author);
      const blogId = blogToEdit?.id || (100 + Math.floor(Math.random() * 900)).toString();
      const blogData = {
        ...formData,
        body: formData.content, // Ensure body field is set for detail page
        id: blogId, // Generate ID between 100-999
        createdAt: blogToEdit?.createdAt || new Date().toISOString(),
        publishDate: new Date().toISOString(),
        author: formData.author, // Ensure author name is set
        authorId: selectedAuthor?.id || '',
        authorImage: selectedAuthor?.image || `https://i.pravatar.cc/150?img=${blogId % 10 + 1}`,
        imageUrl: formData.image ? URL.createObjectURL(formData.image) : blogToEdit?.imageUrl || '',
      };

      if (blogToEdit) {
        await updateBlog(blogToEdit.id, blogData);
      } else {
        await createBlog(blogData);
      }

      navigate('/blog');
    } catch (error) {
      console.error('Error saving blog:', error);
      setApiError(error.message || 'Failed to save blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)",
              backgroundSize: "40px 40px",
              opacity: 0.5,
            },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 4,
              fontWeight: "bold",
              color: "primary.main",
              textAlign: "center",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -8,
                left: "50%",
                transform: "translateX(-50%)",
                width: "60%",
                height: "4px",
                backgroundColor: "primary.light",
                borderRadius: 2,
              },
            }}
          >
            {blogToEdit ? "Edit Blog Post" : "Create New Blog Post"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
              }}
            >
              {/* Left - Image Upload */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ flexBasis: "30%", minWidth: "240px" }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="label"
                    htmlFor="image-upload"
                    sx={{
                      width: "100%",
                      minHeight: "150px",
                      maxHeight: "300px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      border: "2px dashed #ccc",
                      borderRadius: "12px",
                      overflow: "hidden",
                      position: "relative",
                      "&:hover": {
                        borderColor: "primary.main",
                        backgroundColor: "rgba(0, 0, 0, 0.02)",
                      },
                    }}
                  >
                    {formData.image ? (
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : blogToEdit?.imageUrl ? (
                      <img
                        src={blogToEdit.imageUrl}
                        alt="Current"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Click to upload image
                      </Typography>
                    )}
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        cursor: "pointer",
                        zIndex: 1,
                      }}
                    />
                  </Box>
                </Paper>
              </motion.div>

              {/* Right - Form Fields */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <TextField
                  label="Blog Title"
                  name="title"
                  fullWidth
                  value={formData.title}
                  onChange={handleChange}
                  required
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />

                <FormControl fullWidth>
                  <InputLabel id="author-label">Author</InputLabel>
                  <Select
                    labelId="author-label"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    label="Author"
                    required
                  >
                    {authors.map((author) => (
                      <MenuItem key={author.name} value={author.name}>
                        {author.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Category"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ mb: 3 }}>
                  <Editor
                    apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                    value={formData.content}
                    onEditorChange={handleEditorChange}
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help",
                    }}
                  />
                </Box>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.allowComments}
                      onChange={handleChange}
                      name="allowComments"
                    />
                  }
                  label="Allow Comments"
                />

                {apiError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {apiError}
                  </Alert>
                )}

                <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/blog")}
                    sx={{ minWidth: 120 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{ minWidth: 120 }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : blogToEdit ? (
                      "Update"
                    ) : (
                      "Create"
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default CreateBlog;
