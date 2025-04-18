import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative w-full bg-gradient-to-r from-green-700 to-emerald-800 dark:from-green-950 dark:to-emerald-950 pt-24 pb-24 px-6 text-white overflow-hidden">
      {/* Glowing Background Orbs */}
      <div className="absolute -top-16 -left-20 w-80 h-80 bg-emerald-900 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-16 -right-20 w-80 h-80 bg-green-900 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-lg">
          Unlock Limitless Learning
        </h1>
        <p className="text-lg md:text-xl text-gray-100 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          From zero to hero — dive into magical, expert-crafted courses made for bold thinkers and curious minds.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search for courses..."
            className="px-6 py-3 w-80 max-w-full rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white shadow-sm"
          />
          <button className="bg-white text-green-800 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition-all">
            Search
          </button>
        </div>

        <button className="bg-white text-green-800 font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg active:scale-100">
          Explore Courses
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
