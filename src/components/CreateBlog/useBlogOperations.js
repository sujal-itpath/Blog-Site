import { useDispatch } from 'react-redux';
import { blogApiSlice } from '../../redux/api/blogApiSlice';

export const useBlogOperations = ({
  formData,
  setFormData,
  blogToEdit,
  navigate,
  setIsSubmitting,
  setApiError
}) => {
  const dispatch = useDispatch();

  const getLocalBlogs = () => {
    const blogs = localStorage.getItem("localBlogs");
    return blogs ? JSON.parse(blogs) : [];
  };

  const saveLocalBlogs = (blogs) => {
    localStorage.setItem("localBlogs", JSON.stringify(blogs));
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
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleEditorChange = (content) => {
    const cleanedContent = content
      .replace(/<p><br\s*\/?><\/p>/gi, '')
      .replace(/<p>\s*<\/p>/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    setFormData((prev) => ({ ...prev, content: cleanedContent }));
  };

  const createLocalBlog = () => {
    const existingBlogs = getLocalBlogs();
    const maxId = existingBlogs.length > 0 
      ? Math.max(...existingBlogs.map(blog => blog.id)) 
      : 100;
    
    return {
      id: maxId + 1,
      title: formData.title,
      body: formData.content,
      author: formData.author,
      publishDate: new Date().toISOString(),
      allowComments: formData.allowComments,
      image: formData.image ? URL.createObjectURL(formData.image) : `https://picsum.photos/seed/${maxId + 1}/800/400`,
      category: formData.category,
      isLocal: true,
      createdAt: new Date().toISOString(),
      userId: 999,
      isNew: true
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError(null);
  
    try {
      if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
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
          image: formData.image ? URL.createObjectURL(formData.image) : blogToEdit.image,
          category: formData.category,
          isLocal: true
        };

        const localBlogs = getLocalBlogs();
        const updatedLocalBlogs = localBlogs.map((blog) =>
          blog.id === blogToEdit.id ? { ...blog, ...updateData } : blog
        );
        saveLocalBlogs(updatedLocalBlogs);
        
        dispatch(
          blogApiSlice.util.updateQueryData('getBlogs', undefined, (draft) => {
            const index = draft.findIndex((blog) => blog.id === blogToEdit.id);
            if (index !== -1) {
              draft[index] = { ...draft[index], ...updateData };
            }
          })
        );
        
        navigate("/blog", { state: { refresh: true } });
      } else {
        const newBlog = createLocalBlog();
        const localBlogs = getLocalBlogs();
        saveLocalBlogs([...localBlogs, newBlog]);
        
        dispatch(
          blogApiSlice.util.updateQueryData('getBlogs', undefined, (draft) => {
            draft.unshift(newBlog);
          })
        );
        
        navigate("/blog", { state: { refresh: true } });
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
    handleChange
  };
}; 