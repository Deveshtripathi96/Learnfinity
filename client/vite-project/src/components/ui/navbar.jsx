
import { Menu, School2} from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from '@/Darkmode'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from '@radix-ui/react-label'
import { Input } from './input'
import { Separator } from '@radix-ui/react-dropdown-menu'



const Navbar = () => {
  const user=true;
  
  return (
    <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 right-0 left-0 duration-300 z-10 '>
        {/* Desktop */}
        <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
            <div className='flex items-center gap-2'>
            <School2 size={"30"}/>
        <h1 className='hidden md:block font-extrabold text-2xl'>E-learning </h1>
            </div>
            <div>

            </div>
            <div className='flex item-center gap-7'>
            {
  user?(
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
           My learning
         
        </DropdownMenuItem>
        <DropdownMenuItem>
          Edit profile
         
        </DropdownMenuItem>
        <DropdownMenuItem>
          Log out
         
        </DropdownMenuItem>
       
        
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        
      
       
      </DropdownMenuGroup>
      
      <DropdownMenuItem>
        Dashboard
     
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  ):(
    <div className='flex items-center gap-2'>
      <Button variant="outline">Login</Button>
      <Button>Signup</Button>
    </div>
  )
       }
       <ModeToggle/>
            </div>
      
        </div>
        {/*Mobile*/}
        <div className='flex md:hidden item-center justify-between px-4 h-full'>
        <h1 className='font-extrabold text-2xl'>E-learning</h1>
        <MobileNavbar/>
       
        </div>
        
        
    </div>
  )
}

export default Navbar;

const MobileNavbar=()=>{
  const role ='instructor';
  return (
    <Sheet>
  <SheetTrigger asChild>
    <Button  size ='icon' className="rounded-full bg-gray-200 hover:bg-gray-200 " variant="outline">
      <Menu/>
    </Button>
  </SheetTrigger>
  <SheetContent className='flex flex-col'>
    <SheetHeader className='flex flexrow items-center justify-between mt-2'>
      <SheetTitle>E-learning</SheetTitle>
     <ModeToggle/>
    </SheetHeader>
    <Separator className='mr-2'/>
    <nav className='flex flex-col space-y-4'>
      <span>My learning</span>
      <span>Edit profile</span>
      <span>Log out</span>
    </nav>
    {role==='instructor' &&(
       <SheetFooter>
       <SheetClose asChild>
         <Button type="submit">Dashboard</Button>
       </SheetClose>
     </SheetFooter>
    )}
    
  </SheetContent>
</Sheet>
  )
  
}