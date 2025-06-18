import React from "react";
import Course from "./Course";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();
  console.log(data);

  if (isError) return <h1 className="text-center text-red-500 mt-10">Some error occurred while fetching courses.</h1>;

  return (
    <div className="bg-gradient-to-b from-[#f0fdf4] to-[#e0f2fe] dark:from-[#0f172a] dark:to-[#1e293b] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <h2 className="text-center text-4xl font-extrabold text-gray-900 dark:text-white mb-12 tracking-tight">
          Explore Our Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses &&
              data.courses.map((course, index) => (
                <Course key={index} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl rounded-xl overflow-hidden transition-transform hover:scale-[1.02] duration-300 border border-gray-200 dark:border-gray-700">
      <Skeleton className="w-full h-36 rounded-t-xl bg-gray-300 dark:bg-slate-700" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4 bg-gray-300 dark:bg-slate-600 rounded-md" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full bg-gray-300 dark:bg-slate-600" />
            <Skeleton className="h-4 w-20 bg-gray-300 dark:bg-slate-600 rounded" />
          </div>
          <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-slate-600 rounded" />
        </div>
        <Skeleton className="h-5 w-1/4 bg-gray-300 dark:bg-slate-600 rounded" />
      </div>
    </div>
  );
};
