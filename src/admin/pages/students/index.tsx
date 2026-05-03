import { useQuery } from "@tanstack/react-query"
import { studentfn } from "../../../api/student.api"
import { SectionHeading } from "../../../components/common/section.heading"
import { DataLoading } from "../../../components/common/DataLoading"
import { StudentList } from "./student courses/student.lists"
import { Datanotfound } from "../../../components/common/datanotfound"
import { Link } from "react-router"
export const Student = () => {

  const {data,isLoading}=useQuery({
    queryFn:studentfn,
    queryKey:["findall"],
    staleTime: 0  
  })
  console.log(data?.data)
  return (
    
    <div >
       <Link to="/admin/addStudents" className='border-white text-white bg-green-800  '>AddStudents</Link>
      <SectionHeading title="List  of students"
       subtitle="The link of students from bca"
      link="#"/>
        
    
  
  {isLoading &&<DataLoading/> }

  {!isLoading && data?.data?.length>0 
    &&
    (<StudentList students={data.data}/>)
  }
  {!isLoading && data?.data?.length===0 &&<Datanotfound/>}
  </div>
)
}
