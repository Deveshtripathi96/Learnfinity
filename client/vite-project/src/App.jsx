// import { Button } from "@/components/ui/button";
// import Login from "./pages/Login";
// import Navbar from "./components/ui/navbar";
// import Herosection from "./pages/student/Herosection";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Mainlayout from "./Layout/Mainlayout";
// import HeroSection from "./pages/student/Herosection";
// import Courses from "./pages/student/Courses";
// import MyLearning from "./pages/student/MyLearning";
// import Profile from "./pages/student/Profile";

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <Mainlayout />,
//     children: [
//       {
//         path: "/",
//         element: (
//           <>
//             <HeroSection />
//             {/* <Course /> */}
//             <Courses/>
//           </>
//         ),
//       },
//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "my-learning",
//         element: <MyLearning />,
//       },
//       {
//         path: "profile",
//         element: <Profile/>,
//       },
//     ],
//   },
// ]);

// function App() {
//   return (

//     <main>
//     <RouterProvider router={appRouter}/>

    
//     </main>
    
     
     
//   );
// }

// export default App;


// import Login from "./pages/Login";
// import HeroSection from "./pages/student/Herosection";
// import Courses from "./pages/student/Courses";
// import MyLearning from "./pages/student/MyLearning";
// import Profile from "./pages/student/Profile";
// import Mainlayout from "./Layout/Mainlayout";
// import PrivateRoute from "./components/ui/PrivateRoutes"; // your existing component

// import { createBrowserRouter, RouterProvider } from "react-router-dom";


// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <Mainlayout />,
//     children: [
//       {
//         path: "/",
//         element: (
//           <>
//             <HeroSection />
//             <Courses />
//           </>
//         ),
//       },
//       {
//         path: "login",
//         element: <Login />,
       
       
//       },
//       {
//         path: "my-learning",
//         element: (
//           <PrivateRoute>
//             <MyLearning />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "profile",
//         element: (
//           <PrivateRoute>
//             <Profile />
//           </PrivateRoute>
//         ),
//       },
//     ],
//   },
// ]);

// function App() {
//   return (
//     <main>
//       <RouterProvider router={appRouter} />
//     </main>
//   );
// }

// export default App;

//deepseek enhanced version

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./Layout/MainLayout";
import HeroSection from "./pages/student/HeroSection";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
//import { ThemeProvider } from "./components/ui/ThemeProvider";
import { AuthenticatedUser, ProtectedRoute } from "./components/ui/ProtectedRoutes";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
    ],
  },
]);

function App() {
  return (
    <main>
      
        <RouterProvider router={appRouter} />
     
    </main>
  );
}

export default App;

