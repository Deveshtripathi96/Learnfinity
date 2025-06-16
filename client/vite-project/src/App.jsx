import { Button } from "@/components/ui/button";
import Login from "./pages/Login";
import Navbar from "./components/ui/navbar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainlayout from "./Layout/Mainlayout";
import HeroSection from "./pages/student/Herosection";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import { AuthenticatedUser,ProtectedRoute } from "./components/ui/ProtectedRoutes";
//import { Sidebar } from "lucide-react";
import Sidebar from "./pages/admin/lecture/Sidebar";
import Dashboard from "./pages/admin/lecture/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path:"course-detail/:courseId",
        element:(
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
      //admin routes start from here

      
      {
        path:"admin",
        element: <Sidebar/>,
        children:[
          {
            path:"dashboard",
            element: <Dashboard/>
          },
          {
            path:"course",
            element: <CourseTable/>
          },
          {
            path:"course/create",
            element:<AddCourse/>
          },
          {
            path:"course/:courseId",
            element:<EditCourse/>
          },
          {
            path:"course/:courseId/lecture",
            element:<CreateLecture/>
          },
          {
            path:"course/:courseId/lecture/:lectureId",
            element:<EditLecture/>
          }
        ]
      }
    ],
  },

])
function App() {
  return (
    <main>
    <RouterProvider router={appRouter}/>

    
    </main>
    
     
     
  );
}

export default App;

