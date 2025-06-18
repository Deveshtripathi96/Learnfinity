import { Menu, School2 } from "lucide-react";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedOut } from "@/features/authSlice";
import DarkMode from "@/Darkmode";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LogoutUserHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(userLoggedOut());
      toast.success(data?.message || "User logged out successfully");
      navigate("/login");
    }
  }, [isSuccess, data, dispatch, navigate]);

  return (
    <header className="h-16 fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gradient-to-r from-white to-white dark:from-[#0c0c0c] dark:to-[#1a1a1a] border-b border-black/10 shadow-sm transition-colors duration-300">
      {/* Desktop View */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center px-6 h-full">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition">
          <School2 size={26} className="text-black dark:text-white" />
          <h1 className="font-extrabold text-2xl text-black dark:text-white tracking-wide">
            E-learning
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
                  <AvatarFallback>{user?.name?.slice(0, 2)?.toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white dark:bg-gray-900 border dark:border-gray-700">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/my-learning" className="w-full block">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full block">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={LogoutUserHandler}>Log Out</DropdownMenuItem>
                </DropdownMenuGroup>
                {user.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard" className="w-full block">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/signup")}>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex items-center justify-between px-4 h-full">
        <Link to="/" className="flex items-center gap-2">
          <School2 size={24} className="text-black dark:text-white" />
          <h1 className="font-bold text-xl text-black dark:text-white">E-learning</h1>
        </Link>
        <MobileNavbar user={user} onLogout={LogoutUserHandler} />
      </div>
    </header>
  );
};

export default Navbar;

const MobileNavbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full bg-cyan-500 text-black dark:text-white hover:bg-white/30 backdrop-blur"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col dark:bg-[#0c0c0c] bg-blend-soft-light text-black dark:text-white">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="text-lg font-bold  dark:text-white text-gray-900">E-learning</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="my-4" />
        <nav className="flex flex-col gap-4 mx-5">
          {user ? (
            <>
              <Link to="/my-learning" className="hover:underline">My Learning</Link>
              <Link to="/profile" className="hover:underline">Edit Profile</Link>
              <span onClick={onLogout} className="cursor-pointer hover:underline">Log Out</span>
              {user.role === "instructor" && (
                <Link
                  to="/admin/dashboard"
                  className="hover:underline text-center mt-6 bg-white text-green-800 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  Dashboard
                </Link>
              )}
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
