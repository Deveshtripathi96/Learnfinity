import React from 'react';

const Herosection = () => {
  return (
    <section className="relative w-full bg-gradient-to-r from-green-700 to-emerald-800 dark:from-green-950 dark:to-emerald-950 py-20 px-6 text-white overflow-hidden transition-colors duration-500">
      {/* Subtle background glows */}
      <div className="absolute -top-12 -left-12 w-72 h-72 bg-emerald-900 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-green-900 rounded-full blur-3xl opacity-10"></div>

      <div className="relative max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-sm transition duration-300 hover:text-white/90">
          Discover Smarter Learning
        </h1>
        <p className="text-base md:text-lg text-gray-200 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed transition duration-300 hover:text-gray-100">
          Learn from the best. Upskill with curated courses designed for future-ready minds.
        </p>
        <button className="bg-white text-green-800 font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg active:scale-100">
          Start Learning
        </button>
      </div>
    </section>
  );
};

export default Herosection;
