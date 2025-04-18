// redux/slices/authorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authors = [
    { name: 'Sarah Johnson', image: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Michael Chen', image: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Emily Rodriguez', image: 'https://i.pravatar.cc/150?img=3' },
    { name: 'David Kim', image: 'https://i.pravatar.cc/150?img=4' },
    { name: 'Jessica Williams', image: 'https://i.pravatar.cc/150?img=5' },
    { name: 'Robert Garcia', image: 'https://i.pravatar.cc/150?img=6' },
    { name: 'Amanda Lee', image: 'https://i.pravatar.cc/150?img=7' },
    { name: 'James Wilson', image: 'https://i.pravatar.cc/150?img=8' },
    { name: 'Sophia Martinez', image: 'https://i.pravatar.cc/150?img=9' },
    { name: 'Daniel Brown', image: 'https://i.pravatar.cc/150?img=10' },
    { name: 'Olivia Taylor', image: 'https://i.pravatar.cc/150?img=11' },
    { name: 'William Anderson', image: 'https://i.pravatar.cc/150?img=12' },
    { name: 'Emma Thompson', image: 'https://i.pravatar.cc/150?img=13' },
    { name: 'Christopher Moore', image: 'https://i.pravatar.cc/150?img=14' },
    { name: 'Isabella Clark', image: 'https://i.pravatar.cc/150?img=15' },
    { name: 'Matthew White', image: 'https://i.pravatar.cc/150?img=16' },
    { name: 'Ava Lewis', image: 'https://i.pravatar.cc/150?img=17' },
    { name: 'Andrew Hall', image: 'https://i.pravatar.cc/150?img=18' },
    { name: 'Mia Young', image: 'https://i.pravatar.cc/150?img=19' },
    { name: 'Joseph King', image: 'https://i.pravatar.cc/150?img=20' }
];

const authorSlice = createSlice({
    name: 'authors',
    initialState: authors,
    reducers: {}
});

export const selectAuthors = (state) => state.authors;
export default authorSlice.reducer;
