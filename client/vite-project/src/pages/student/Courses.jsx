import React from "react";
import Course from "./Course";
import { Skeleton } from "@/components/ui/skeleton";

// Dummy course data
const dummyCourses = Array.from({ length: 8 }).map((_, i) => ({
  _id: `course-${i + 1}`,
  courseTitle: `Frontend Mastery ${i + 1}`,
  courseThumbnail: `https://www.cdmi.in/courses@2x/web-developments.webp`,
  courseLevel: i % 2 === 0 ? "Beginner" : "Intermediate",
  coursePrice: 999 + i * 100,
  creator: {
    name: `Instructor ${i + 1}`,
    photoUrl: "https://i.pravatar.cc/150?img=" + (i + 10),
  },
}));

const Courses = () => {
  const isLoading = false; // toggle this to true to see the skeletons

  return (
    <div className="bg-gray-100 dark:bg-[#141414] min-h-screen">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : dummyCourses.map((course) => (
                <Course key={course._id} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36 rounded-t-lg" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-5 w-1/4 " />
      </div>
    </div>
  );
};
