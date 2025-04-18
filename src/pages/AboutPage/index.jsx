import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-6">About Us ✨</h1>

      <p className="text-lg text-center mb-12 text-gray-600">
        Welcome to <span className="font-semibold text-purple-600">Inkspire</span> – where thoughts turn into words, and words spark revolutions. 🖋️💭
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Who Are We? 🤔</h2>
          <p className="text-gray-700 leading-relaxed">
            We're a bunch of caffeine-fueled keyboard warriors 🧠⚡ who believe every idea deserves a spotlight – even the ones you came up with in the shower. 🚿
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Our Mission 🚀</h2>
          <p className="text-gray-700 leading-relaxed">
            To provide a platform where creators, thinkers, and midnight snack philosophers 🍕🕛 can share their stories, spark conversations, and maybe even start a friendly debate or two (no chairs will be thrown... probably).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Why Inkspire? 📝</h2>
          <p className="text-gray-700 leading-relaxed">
            Because we believe your thoughts are worth more than just a scribble in a forgotten notebook. Whether you're a seasoned writer or just here to rant creatively – we got you. 💜
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Fun Fact 🎉</h2>
          <p className="text-gray-700 leading-relaxed">
            Every time someone publishes a blog here, somewhere in the world a cat walks over a keyboard and accidentally creates a masterpiece. 🐱⌨️
          </p>
        </section>
      </div>

      <div className="mt-16 text-center">
        <p className="text-lg text-gray-600">
          So go ahead — <span className="font-semibold text-purple-600">write, read, laugh, cry, repeat</span>. This is your space.
        </p>
        <p className="mt-2 text-purple-700 text-sm italic">— Team Inkspire 💡</p>
      </div>
    </div>
  );
};

export default AboutPage;
