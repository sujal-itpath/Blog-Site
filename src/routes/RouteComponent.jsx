import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import BlogPage from "../pages/BlogPage";
import CreateBlog from "../components/CreateBlog";
import BlogDetailPage from "../components/BlogDetailPage";
import AboutPage from "../pages/AboutPage";
import NotFoundPage from "../pages/NotFoundPage.jsx";

const RouteComponent = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />

      <Route
        path="/blog"
        element={
          <Layout>
            <BlogPage />
          </Layout>
        }
      />

      <Route
        path="/create-blog"
        element={
          <Layout>
            <CreateBlog />
          </Layout>
        }
      />

      <Route
        path="/blog/:id"
        element={
          <Layout>
            <BlogDetailPage />
          </Layout>
        }
      />

      <Route
        path="/about"
        element={
          <Layout>
            <AboutPage />
          </Layout>
        }
      />

      <Route
        path="*"
        element={
          <NotFoundPage />
        }
      />
    </Routes>
  );
};

export default RouteComponent;
