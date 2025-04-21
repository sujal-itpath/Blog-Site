import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <motion.h1
        className="text-4xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Us ✨
      </motion.h1>

      <motion.p
        className="text-lg text-center mb-12 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Welcome to <span className="font-semibold text-purple-600">Inkspire</span> – where thoughts turn into words, and words spark revolutions. 🖋️💭 Buckle up, buttercup.
      </motion.p>

      <div className="space-y-10">
        <motion.section
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-2">Who Are We? 🤔</h2>
          <p className="text-gray-700 leading-relaxed">
            We’re a band of keyboard-tapping dreamers fueled by caffeine, memes, and questionable life choices ☕💡. If you've ever written a novel in your head during a boring meeting — you're one of us.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-2">Our Mission 🚀</h2>
          <p className="text-gray-700 leading-relaxed">
            To be the megaphone for your inner monologue. Whether it’s deep thoughts at 3AM or a review of your favorite potato chip flavor — every voice matters. Especially yours, Crunchy Nacho.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-2">Why Inkspire? 📝</h2>
          <p className="text-gray-700 leading-relaxed">
            Because "Scribbly Thoughts Dot Com" was taken. But also, because we believe in unfiltered creativity — and we know that some of the best ideas come while you're holding a taco in one hand and your phone in the other 🌮📱.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-2">Fun Fact 🎉</h2>
          <p className="text-gray-700 leading-relaxed">
            Every time someone hits “publish” on a blog, a unicorn somewhere sneezes glitter and a WiFi signal improves. Coincidence? We think not. 🦄✨📶
          </p>
        </motion.section>
      </div>

      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <p className="text-lg text-gray-600">
          So go ahead — <span className="font-semibold text-purple-600">write, read, laugh, cry, repeat</span>. This is your playground.
        </p>
        <p className="mt-2 text-purple-700 text-sm italic">— Team Inkspire 💡 (Official members of the “Accidentally funny but lowkey profound” club)</p>
      </motion.div>
    </div>
  );
};

export default AboutPage;
