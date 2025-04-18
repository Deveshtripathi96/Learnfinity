import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  // Generate initials for AvatarFallback
  const getInitials = (name) => {
    if (!name) return "CN";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Link
      to={`/course-detail/${course._id}`}
      aria-label={`Go to ${course.courseTitle} course details`}
    >
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src={course.courseThumbnail || "/default-thumbnail.jpg"}
            alt="course thumbnail"
            className="w-full h-40 object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="px-5 py-4 space-y-3">
          <h1
            className="hover:underline font-bold text-lg truncate"
            title={course.courseTitle}
          >
            {course.courseTitle}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={course.creator?.photoUrl || "https://github.com/shadcn.png"}
                  alt={course.creator?.name || "creator"}
                />
                <AvatarFallback>{getInitials(course.creator?.name)}</AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm">{course.creator?.name || "Unknown"}</h1>
            </div>
            <Badge className="bg-emerald-700 text-white px-3 py-2 text-xs rounded-full">
              {course.courseLevel}
            </Badge>
          </div>
          <div className="text-lg font-bold ">
            <span>₹{Number(course.coursePrice).toLocaleString("en-IN")}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
