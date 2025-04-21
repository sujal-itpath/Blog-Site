/* eslint-disable no-unused-vars */
import { useBlog } from "../../context/BlogContext";

export const useBlogOperations = ({
  formData,
  setFormData,
  blogToEdit,
  navigate,
  setIsSubmitting,
  setApiError,
}) => {
  const { createBlog, updateBlog, refetchBlogs } = useBlog();

  const getLocalBlogs = () => {
    const blogs = localStorage.getItem("localBlogs");
    return blogs ? JSON.parse(blogs) : [];
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: file,
        imageUrl: imageUrl,
      }));
    }
  };

  const handleEditorChange = (content) => {
    const cleanedContent = content
      .replace(/<p><br\s*\/?><\/p>/gi, "")
      .replace(/<p>\s*<\/p>/gi, "")
      .replace(/\s+/g, " ")
      .trim();

    setFormData((prev) => ({ ...prev, content: cleanedContent }));
  };

  const createLocalBlog = () => {
    const existingBlogs = getLocalBlogs();
    const maxId =
      existingBlogs.length > 0
        ? Math.max(...existingBlogs.map((blog) => blog.id))
        : 100;

    return {
      id: maxId + 1,
      title: formData.title,
      body: formData.content,
      author: formData.author,
      publishDate: new Date().toISOString(),
      allowComments: formData.allowComments,
      imageUrl: formData.imageUrl || `https://picsum.photos/seed/${maxId + 1}/800/400`,
      category: formData.category,
      isLocal: true,
      createdAt: new Date().toISOString(),
      userId: Math.floor(Math.random() * 20) + 1,
      isNew: true,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError(null);

    try {
      if (
        !formData.title.trim() ||
        !formData.content.trim() ||
        !formData.author.trim()
      ) {
        setApiError("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      if (blogToEdit) {
        const updateData = {
          id: blogToEdit.id,
          title: formData.title,
          body: formData.content,
          author: formData.author,
          publishDate: new Date().toISOString(),
          allowComments: formData.allowComments,
          imageUrl: formData.imageUrl || blogToEdit.imageUrl || `https://picsum.photos/seed/${blogToEdit.id}/800/400`,
          category: formData.category,
          isLocal: true,
        };

        await updateBlog(blogToEdit.id, updateData);
        navigate("/blog");
      } else {
        const newBlog = createLocalBlog();
        await createBlog(newBlog);
        navigate("/blog");
      }
    } catch (err) {
      console.error("Error submitting blog:", err);
      setApiError(err.message || "An error occurred while saving the blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    handleImageChange,
    handleEditorChange,
    handleChange,
  };
};
