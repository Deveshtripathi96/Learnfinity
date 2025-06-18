import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-[#4f46e5] to-[#9333ea] dark:from-[#1e1b4b] dark:to-[#581c87] pt-28 pb-32 px-6 text-white overflow-hidden">
      {/* Soft glowing background orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-400 dark:bg-purple-800 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-500 dark:bg-indigo-900 rounded-full blur-3xl opacity-25 animate-pulse"></div>

      <div className="relative max-w-4xl mx-auto text-center z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-xl">
          Unlock Limitless Learning
        </h1>
        <p className="text-lg md:text-xl text-gray-100 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          From zero to hero — dive into magical, expert-crafted courses made for bold thinkers and curious minds.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-xl overflow-hidden max-w-xl mx-auto mb-6"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <Button
            type="submit"
            className="bg-indigo-600 dark:bg-indigo-700 text-white px-6 py-3 rounded-r-full hover:bg-indigo-700 dark:hover:bg-indigo-800 transition"
          >
            Search
          </Button>
        </form>

        <Button
          onClick={() => navigate(`/course/search?query`)}
          className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-300 font-semibold rounded-full px-6 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          Explore Courses
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
