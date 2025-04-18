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
import { useSelector } from 'react-redux';
import { selectCategories } from '../../redux/api/categorySlice';
import { useBlogOperations } from './useBlogOperations';

const CreateBlog = () => {
  const location = useLocation();
  const blogToEdit = location.state?.blogToEdit;
  const navigate = useNavigate();
  const categoriesFromStore = useSelector(selectCategories);
  
  // Fallback categories in case the Redux store is not properly initialized
  const categories = categoriesFromStore && categoriesFromStore.length > 0 
    ? categoriesFromStore 
    : ['Technology', 'Travel', 'Food', 'Health', 'Business', 'Entertainment', 'Science', 'Lifestyle', 'Education', 'Sports'];

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    allowComments: true,
    image: null,
    category: 'Technology', // Default category
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    handleSubmit: handleBlogSubmit,
    handleImageChange,
    handleEditorChange,
    handleChange
  } = useBlogOperations({
    formData,
    setFormData,
    blogToEdit,
    navigate,
    setIsSubmitting,
    setApiError
  });

  useEffect(() => {
    if (blogToEdit) {
      setFormData({
        title: blogToEdit.title || "",
        content: blogToEdit.body || "",
        author: blogToEdit.author || "",
        allowComments: blogToEdit.allowComments ?? true,
        image: null,
        category: blogToEdit.category || 'Technology',
      });
    }
  }, [blogToEdit]);

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

          <form onSubmit={handleBlogSubmit}>
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

                <TextField
                  fullWidth
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                />

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
                    {categories && categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.allowComments}
                      onChange={handleChange}
                      name="allowComments"
                      color="primary"
                    />
                  }
                  label="Allow Comments"
                />

                {/* Rich Text Editor */}
                <Box sx={{ mt: 1 }}>
                  <Editor
                    key={blogToEdit ? blogToEdit.id : "new"}
                    apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                    value={formData.content}
                    init={{
                      height: 400,
                      menubar: true,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar: `
      undo redo | formatselect |
      bold italic underline strikethrough | forecolor backcolor |
      alignleft aligncenter alignright alignjustify |
      bullist numlist outdent indent |
      link image media table blockquote |
      code preview fullscreen | removeformat | help
    `,
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                      forced_root_block: 'p',
                      remove_script_host: true,
                      convert_urls: true,
                      paste_as_text: false,
                      paste_word_valid_elements: "p,b,strong,i,em,h1,h2,h3,h4,h5,h6,ul,ol,li,a[href],span,img[src]",
                      paste_retain_style_properties: "none",
                      paste_remove_styles: true,
                      paste_remove_styles_if_webkit: true,
                      paste_strip_class_attributes: "all",
                      paste_text_sticky: true,
                      paste_text_sticky_default: true,
                      paste_auto_cleanup_on_paste: true,
                      paste_cleanup_paste: true,
                      paste_cleanup_paste_on_paste: true,
                      paste_cleanup_paste_on_paste_iframe: true,
                      paste_cleanup_paste_on_paste_webkit: true,
                      paste_cleanup_paste_on_paste_ie: true,
                      paste_cleanup_paste_on_paste_gecko: true,
                      paste_cleanup_paste_on_paste_old: true,
                      paste_cleanup_paste_on_paste_new: true,
                      paste_cleanup_paste_on_paste_all: true,
                    }}
                    onEditorChange={(content) => {
                      handleEditorChange(content);
                    }}
                  />
                </Box>

                <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                    //   type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      onClick={handleBlogSubmit}
                      sx={{
                        px: 6,
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
                      {isSubmitting ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : blogToEdit ? (
                        "Update Blog Post"
                      ) : (
                        "Create Blog Post"
                      )}
                    </Button>
                  </motion.div>
                </Box>
              </Box>
            </Box>
          </form>

          {(apiError) && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {apiError}
            </Alert>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default CreateBlog;
