/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../../assets/Hero.svg';
import 'animate.css';
import Typewriter from 'typewriter-effect';

const HeroSection = ({ scrollToRef }) => {
  const scrollToTrendingBlogCard = () => {
    scrollToRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section className="w-full min-h-screen px-6 pt-2 pb-6 flex items-center relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-[300px] h-[300px] rounded-full opacity-30 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full opacity-30 blur-3xl animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between w-full gap-8 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 text-center md:text-left space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight tracking-tight">
            Discover <span className="text-blue-500">Ideas</span>,<br />
            Share Your <span className="text-purple-600 md:inline-block">
              <Typewriter
                options={{
                  strings: ['Thoughts', 'Opinions', 'Creativity', 'Insights'],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                  deleteSpeed: 50,
                }}
              />
            </span>
          </h1>

          <p className="text-gray-700 text-lg max-w-md mx-auto md:mx-0 leading-relaxed">
            Discover thoughtful stories. Write freely. Connect deeply. All in one creative space.
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTrendingBlogCard}
            className="inline-block px-8 py-3 bg-purple-600 text-white rounded-full text-md font-semibold hover:bg-purple-700 transition duration-300 shadow-xl"
          >
            Start Exploring
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0"
        >
          <motion.img
            src={Hero}
            alt="Hero Illustration"
            className="w-full max-w-md drop-shadow-2xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
