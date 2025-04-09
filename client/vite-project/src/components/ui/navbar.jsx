import { Menu, School2 } from 'lucide-react'
import React from 'react'
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

const Navbar = () => {
  const user = true

  return (
    <div className="h-16 fixed top-0 left-0 right-0 z-20 backdrop-blur-md bg-green-900/60 dark:bg-emerald-950/60 border-b border-green-800 shadow-sm transition-all duration-300">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center px-6 h-full">
        <div className="flex items-center gap-2">
          <School2 size={26} className="text-white drop-shadow-md" />
          <h1 className="font-extrabold text-2xl text-white drop-shadow-md tracking-wide">
            E-learning
          </h1>
        </div>

        <div className="flex items-center gap-5">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white dark:bg-[#1a1a1a] text-sm">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>My learning</DropdownMenuItem>
                  <DropdownMenuItem>Edit profile</DropdownMenuItem>
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" className="text-white border-white">Login</Button>
              <Button className="bg-white text-green-800 hover:bg-gray-100">Signup</Button>
            </div>
          )}
          <ModeToggle />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl text-white drop-shadow-md tracking-wide">
          E-learning
        </h1>
        <MobileNavbar />
      </div>
    </div>
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
