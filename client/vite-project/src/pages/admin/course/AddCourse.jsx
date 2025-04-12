import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/courseApi";
import { Loader2 } from "lucide-react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const navigate = useNavigate();
  
  const [Title,setTitle] = useState("");
  const [category,setCategory] = useState("");
  const [createCourse,{data, isLoading,error,isSuccess}] = useCreateCourseMutation();

  const getSelectedCategory = (value)=>{
    setCategory(value)
  }
  const createCourseHandler = async()=>{
     await createCourse({Title,category})
  };

  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message || "Course created")
      navigate('/admin/course');
    }
  },[isSuccess,error])


  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add course,add some basic details for your new course
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa magni
          voluptates labore ut expedita praesentium delectus deleniti tenetur.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your Course Name"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="Node Js">Node Js</SelectItem>
                <SelectItem value="Data Analyst">Data Analyst</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="outline" onClick ={()=>navigate("/admin/course")}>Back</Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {
              isLoading ? (<>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait
              </>) : "Create"
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
