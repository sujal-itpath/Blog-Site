// HomePage.jsx
import React, { useRef } from 'react';
import HeroSection from '../../components/HeroSection';
import BlogCards from '../../components/TrendingBlogCards';
import Feedback from '../../components/Feedback';

const HomePage = () => {
  const trendingRef = useRef(null); // 👈 create ref

  return (
    <>
      <HeroSection scrollToRef={trendingRef} /> {/* 👈 pass to Hero */}
      <div ref={trendingRef}>
        <BlogCards />
      </div>
      <Feedback />
    </>
  );
};

export default HomePage;
