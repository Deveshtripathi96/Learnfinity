import { Menu, School2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from '@/Darkmode'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { userLoggedOut } from "@/features/authSlice"; // ✅ import this

const Navbar = () => {
  const {user}=useSelector(store=>store.auth)
  const [logoutUser,{data,isSuccess}]=useLogoutUserMutation();
  const navigate=useNavigate();
 console.log(user);
 const LogoutUserHandler=async ()=>{
  await logoutUser();
  
 }
  // useEffect(()=>{
  //   if(isSuccess && data){
      
  //     toast.success(data.message ||"User log out successfully")
      
  //   }
  //   navigate("/login");
    
  // },[isSuccess]);
  const dispatch = useDispatch();

useEffect(() => {
  if (isSuccess) {
    dispatch(userLoggedOut()); // ✅ clear user from Redux
    toast.success(data?.message || "User logged out successfully");
    navigate("/login"); // ✅ redirect to login
  }
}, [isSuccess, data, dispatch, navigate]);

  return (
    <header className="h-16 fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-gradient-to-r from-white to-white dark:from-emerald-950 dark:to-green-950 border-b border-black shadow-md transition-all duration-300">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center px-6 h-full">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition">
          <School2 size={26} className="text-black drop-shadow-md" />
          <h1 className="font-extrabold text-2xl text-black drop-shadow-md tracking-wide">
            E-learning
          </h1>
        </div>

        <div className="flex items-center gap-5 border-black">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-100 dark:bg-[#1a1a1a] text-sm">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem> <Link to="my-learning">My learning</Link></DropdownMenuItem>
                  <DropdownMenuItem> <Link to="profile">Edit profile</Link></DropdownMenuItem>
                  <DropdownMenuItem onClick={LogoutUserHandler}>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
                {
                  user.role==="instructor" &&(
                    <>
                     <DropdownMenuSeparator />
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                    </>
                  )
                }
               
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" className="bg-white text-green-800 hover:bg-gray-100" onClick={()=>navigate("/login")}>
                Login
              </Button>
              <Button className="bg-white text-green-800 hover:bg-gray-100" onClick={()=>navigate("/login")}>
                Signup
              </Button>
            </div>
          )}
          <ModeToggle />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <div className="flex items-center gap-2">
          <School2 size={24} className="text-white" />
          <h1 className="font-bold text-xl text-white">E-learning</h1>
        </div>
        <MobileNavbar />
      </div>
    </header>
  )
}

export default Navbar

const MobileNavbar = () => {
  const role = 'instructor'

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col dark:bg-[#0c0c0c]">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="text-lg font-bold text-white">E-learning</SheetTitle>
          <ModeToggle />
        </SheetHeader>
        <Separator className="my-4" />
        <nav className="flex flex-col space-y-4 text-base font-medium text-white">
          <span>My learning</span>
          <span>Edit profile</span>
          <span>Log out</span>
        </nav>
        {role === 'instructor' && (
          <SheetFooter className="mt-auto pt-4">
            <SheetClose asChild>
              <Button type="submit" className="w-full bg-white text-green-800 hover:bg-gray-100">
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
