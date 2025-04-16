import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichtextEditor from "@/components/ui/RichtextEditor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditCourseMutation, useGetCourseByIdQuery } from "@/features/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const isPublised = false;
  const params = useParams();
  const courseId = params.courseId;

  const [input, setInput] = useState({
    Title: "",
    subTitle: "",
    description: "",
    category: "",
    price: "",
    courseLevel: "",
    courseThumbnail: "",
  });
  const[preview,setPreview] = useState("");
  // fetch course data
  const {data:courseData, isLoading:courseLoading} = useGetCourseByIdQuery(courseId)

  
  // console.log(course)
  useEffect(() =>{
    if(courseData?.course){
      const course = courseData.course
      setInput({
        Title: course.Title,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        price: course.price,
        courseLevel: course.courseLevel,
        courseThumbnail: "",
      })
    }
  },[courseData])

  const navigate = useNavigate();
  const [editCourse,{data,isLoading,isSuccess,error}] = useEditCourseMutation();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) =>{
    setInput({ ...input, category: value });
  }

  // get file
  const selectThumbnail = (e) =>{
    const file = e.target.files?.[0];
    if(file){
      setInput({...input,courseThumbnail: file})
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreview(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  }
  const selectCourseLevel = (value) =>{
    setInput({ ...input, courseLevel: value });
  }

  const updateHandler = async() =>{
    const formdata = new FormData();
    formdata.append("title",input.Title);
    formdata.append("subTitle",input.subTitle);
    formdata.append("description",input.description);
    formdata.append("category",input.category);
    formdata.append("price",input.price);
    formdata.append("courseLevel",input.courseLevel);
    formdata.append("courseThumbnail",input.courseThumbnail);

    await editCourse({formdata,courseId});
  }

  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message || "Course updated")
    }
    if(error){
      toast.error(error.data.message || "Error updating course")
    }
  },[isSuccess,error])
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make Changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            {isPublised ? "Unpublish" : "Publish"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="Title"
              value={input.Title}
              onChange={changeHandler}
              placeholder="Ex. Nodejs dev"
            />
          </div>
          <div>
            <Label> Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeHandler}
              placeholder="Ex. Become pro web developer"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichtextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select onChange={selectCategory}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Frontend Developer">
                      Frontend Developer
                    </SelectItem>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="Node Js">Node Js</SelectItem>
                    <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select onChange={selectCourseLevel}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel> Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (INR)</Label>
              <Input
                type="number"
                name="price"
                value={input.price}
                onChange={changeHandler}
                placeholder="1000"
                className="w-fit"
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input type="file" accept="image/*" className="w-fit" onChange={selectThumbnail}/>{
              preview && ( <img src={preview} className="w-64 my-2"/>)
            }
          </div>
          <div className="space-x-4">
            <Button variant="outline" onClick={()=> navigate("/admin/course")}>Cancel</Button>
            <Button disabled={isLoading} onClick={updateHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                <>Save</>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
