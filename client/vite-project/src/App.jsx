import { Button } from "@/components/ui/button";
import Login from "./pages/Login";
import Navbar from "./components/ui/navbar";
import Herosection from "./pages/student/Herosection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainlayout from "./Layout/Mainlayout";
import HeroSection from "./pages/student/Herosection";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";

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
            {/* <Course /> */}
            <Courses/>
          </>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "my-learning",
        element: <MyLearning />,
      },
      {
        path: "profile",
        element: <Profile/>,
      },
    ],
  },
]);

function App() {
  return (

    <main>
    <RouterProvider router={appRouter}/>

    
    </main>
    
     
     
  );
}

export default App;
