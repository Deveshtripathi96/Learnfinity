import { Button } from "@/components/ui/button";
import Login from "./pages/student/Login";
import Navbar from "./components/ui/navbar";
import Herosection from "./pages/student/Herosection";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Sidebar from "./pages/admin/lecture/Sidebar"
import Dashboard from "./pages/admin/lecture/Dashboard"
import CourseTable from "./pages/admin/course/CourseTable"
import AddCourse from "./pages/admin/course/AddCourse"
import EditCourse from "./pages/admin/course/EditCourse"


const appRouter = createBrowserRouter([
  {
    path: '/login',
    element:<Login/>
  },
  {
    path:"/admin",
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
      }
    ]
  }

])
function App() {
  return (
    <main>
      <RouterProvider router={appRouter}/>
    </main>
  )
}

export default App;
