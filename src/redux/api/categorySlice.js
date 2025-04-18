// redux/slices/categorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const categories = [
    'Technology',
    'Travel',
    'Food',
    'Health',
    'Business',
    'Entertainment',
    'Science',
    'Lifestyle',
    'Education',
    'Sports'
];

const categorySlice = createSlice({
    name: 'categories',
    initialState: categories,
    reducers: {}
});

export const selectCategories = (state) => state.categories;
export default categorySlice.reducer; 