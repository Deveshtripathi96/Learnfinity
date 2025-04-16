import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetCreatorCourseQuery } from '@/features/courseApi'
import {Edit, Ghost } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'


function CourseTable() {
  const {data,isLoading} = useGetCreatorCourseQuery();
    // if(isLoading)return <h1>Loading...</h1>

    // console.log(data)
    const navigate = useNavigate();
  return (
    <div>
      <Button onClick={()=>navigate(`create`)}>Create a new course</Button>
      <Table>
      <TableCaption>A list of your recent courses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.courses.map((course) => (
          <TableRow key={course?._id}>
            <TableCell className="font-medium">{course?.price || "NA"}</TableCell>
            <TableCell><Badge>{course.isPublised ? "Published" : "Draft"}</Badge></TableCell>
            <TableCell>{course?.Title}</TableCell>
            <TableCell className="text-right"><Button size ='sm' variant={Ghost} onClick={()=>navigate(`${course._id}`)}><Edit/></Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}

export default CourseTable
