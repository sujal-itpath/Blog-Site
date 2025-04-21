import React from 'react';
import { BlogProvider } from './BlogContext';
import { AuthorProvider } from './AuthorContext';
import { CategoryProvider } from './CategoryContext';

export const AppProviders = ({ children }) => {
  return (
    <BlogProvider>
      <AuthorProvider>
        <CategoryProvider>
          {children}
        </CategoryProvider>
      </AuthorProvider>
    </BlogProvider>
  );
};

export * from './BlogContext';
export * from './AuthorContext';
export * from './CategoryContext'; 