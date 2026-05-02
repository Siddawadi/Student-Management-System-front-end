import { useQuery } from "@tanstack/react-query";
import { CourseFn } from "../../../../api/course.api";
import { DataLoading } from "../../../../components/common/DataLoading";
import { SectionHeading } from "../../../../components/common/section.heading";
import { Link } from "react-router";

import ManageCourse from "./course.content";

export const StudentCourseSection = ()=>{

const {data , isLoading}= useQuery({
queryFn:CourseFn,
queryKey:["get all courses"]

})
console.log(data?.data)

return(
<div>
    <Link
        to="/admin/addStudents"
        className='border px-4 py-2 text-white bg-green-700 rounded-lg'
      >
        Add Students
      </Link>
    <SectionHeading title="Courses " subtitle="" link="#"/>


    {isLoading && <DataLoading/> }

    {!isLoading && data?.data?.length>0 &&(
        <ManageCourse courses={data.data}   />
    )}
</div>
)}