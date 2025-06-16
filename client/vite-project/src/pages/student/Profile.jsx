import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@radix-ui/react-avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Course from './Course';
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';

const Profile = () => {
const [name,setName]=useState("");
const [profilePhoto,setProfilePhoto]=useState("");

const onChangeHandler=(e)=>{
  const file=e.target.files?.[0];
  if(file) setProfilePhoto(file);
}


  const {data,isLoading,refetch}=useLoadUserQuery();
  const [updateUser,{data:updateUserdata,isLoading:updateUserIsLoading,error,isError,isSuccess:updateUserSuccess}]=useUpdateUserMutation();
  
  
  const {user}=data || {};
  const updateUserHandler= async ()=>{
   const formData= new FormData();
   formData.append("name",name);
   formData.append("profilePhoto",profilePhoto);

   await updateUser(formData);
  };

  useEffect(()=>{
    refetch();
  },[])
  useEffect(() => {
    if (updateUserSuccess) {
      refetch();
      toast.success(updateUserdata?.message || "Profile Updated");
      
    }
    if (isError) {
      toast.error(error?.data?.message || error?.message || "Failed to Update");
    }
  }, [error, updateUserdata, updateUserSuccess, isError]);
  
  
 const enrolledCourses=[1,2,3];
 
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center md:text-left mb-8">
        PROFILE
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="flex flex-col items-center">
          <Avatar className="h-28 w-28 md:h-36 md:w-36 border-2 border-gray-300 dark:border-gray-700 shadow-md">
            <AvatarImage
              src={ user?.photoUrl ||'https://github.com/shadcn.png'}
              alt="@shadcn"
              className="rounded-full"
            />
            <AvatarFallback className="text-xl font-bold">
              CN
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full">
          <div className="mb-4">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              Name:
              <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                {user?.name}
              </span>
            </p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              Email:
              <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                {user?.email}
              </span>
            </p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              Role:
              <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                {user?.role.toUpperCase()}
              </span>
            </p>
          </div>

          <Dialog >
            <DialogTrigger asChild >
              <Button className="mt-2" size="sm">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className=" mt-10 mx-1 bg-cyan-300 max-w-sm rounded-lg px-8 py-10">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  Edit Profile
                </DialogTitle>
                <DialogDescription className="text-sm  mt-1 text-stone-900-muted-foreground">
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4 ">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="name" className="text-sm font-medium text-black">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={
                      (e)=>{
                        setName(e.target.value)
                      }
                    }
                   
                    placeholder="Name"
                    className="h-9 px-3 text-sm bg-white"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="photo" className="text-sm font-medium text-black">
                    Profile Photo
                  </Label>
                  <Input
                    id="photo"
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className=" bg-white h-9 px-2 text-sm file:mr-2 file:py-1 file:px-3 file:border file:rounded-md file:text-sm"
                  />
                </div>
              </div>

              <DialogFooter className="mt-7">
                <Button disabled={updateUserIsLoading} onClick={updateUserHandler} className="w-full sm:w-auto">
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {enrolledCourses.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default Profile;



// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Loader2 } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import Course from "./Course";
// import {
//   useLoadUserQuery,
//   useUpdateUserMutation,
// } from "@/features/api/authApi";
// import { toast } from "sonner";

// const Profile = () => {
//   const [name, setName] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState("");

//   const { data, isLoading, refetch } = useLoadUserQuery();
//   const [
//     updateUser,
//     {
//       data: updateUserData,
//       isLoading: updateUserIsLoading,
//       isError,
//       error,
//       isSuccess,
//     },
//   ] = useUpdateUserMutation();

//   console.log(data);

//   const onChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setProfilePhoto(file);
//   };

//   const updateUserHandler = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("profilePhoto", profilePhoto);
//     await updateUser(formData);
//   };

//   useEffect(() => {
//     refetch();
//   }, []);

//   useEffect(() => {
//     if (isSuccess) {
//       refetch();
//       toast.success(data.message || "Profile updated.");
//     }
//     if (isError) {
//       toast.error(error.message || "Failed to update profile");
//     }
//   }, [error, updateUserData, isSuccess, isError]);

//   if (isLoading) return <h1>Profile Loading...</h1>;

//   const user = data && data.user;

//   console.log(user);
  

//   return (
//     <div className="max-w-4xl mx-auto px-4 my-10">
//       <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
//         <div className="flex flex-col items-center">
//           <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
//             <AvatarImage
//               src={user?.photoUrl || "https://github.com/shadcn.png"}
//               alt="@shadcn"
//             />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </div>
//         <div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Name:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user.name}
//               </span>
//             </h1>
//           </div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Email:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user.email}
//               </span>
//             </h1>
//           </div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Role:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user.role.toUpperCase()}
//               </span>
//             </h1>
//           </div>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button size="sm" className="mt-2">
//                 Edit Profile
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogDescription>
//                   Make changes to your profile here. Click save when you're
//                   done.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Name</Label>
//                   <Input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Name"
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Profile Photo</Label>
//                   <Input
//                     onChange={onChangeHandler}
//                     type="file"
//                     accept="image/*"
//                     className="col-span-3"
//                   />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button
//                   disabled={updateUserIsLoading}
//                   onClick={updateUserHandler}
//                 >
//                   {updateUserIsLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
//                       wait
//                     </>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>
//       <div>
//         <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
//           {user.enrolledCourses.length === 0 ? (
//             <h1>You haven't enrolled yet</h1>
//           ) : (
//             user.enrolledCourses.map((course) => (
//               <Course course={course} key={course._id} />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
