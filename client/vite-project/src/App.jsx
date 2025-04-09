import { Button } from "@/components/ui/button";
import Login from "./pages/Login";
import Navbar from "./components/ui/navbar";
import Herosection from "./pages/student/Herosection";

function App() {
  return (
    <div className="min-h-svh flex flex-col">
      <Navbar />
      <Herosection />
      <div className="flex justify-center">
        <Login />
      </div>
    </div>
  );
}

export default App;
