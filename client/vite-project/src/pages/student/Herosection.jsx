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
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("");
  }

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
             <form onSubmit={searchHandler} className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button type="submit" className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800">Search</Button>
        </form>
       <Button onClick={()=> navigate(`/course/search?query`)} className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200">Explore Courses</Button>
      </div>
    </section>
  );
};

export default HeroSection;
