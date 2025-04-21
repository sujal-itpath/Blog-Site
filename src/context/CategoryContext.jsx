import React, { createContext, useContext } from 'react';

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

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
}; 