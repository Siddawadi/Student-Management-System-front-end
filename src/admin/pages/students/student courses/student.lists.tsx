 import type { IStudent } from "../../../../types/student.types"
import { Studentcard } from "../student.card"
 interface Iprops{
    students:IStudent[]
 }
export const StudentList =({students}:Iprops)=>{
    return(
<div className=" text-white grid grid-cols-3 shadow-2xl my-2  border-2 gap-2 py-5 px-5 min-h-screen ">
    
    {students.map((student)=>
        <Studentcard key={student._id} student={student}/>)}


</div>
    )
}