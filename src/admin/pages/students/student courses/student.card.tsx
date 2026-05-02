
import type { IStudent } from "../../../../types/student.types"
interface Iprops{
    student:IStudent
}
export const Studentcard = ({student}:Iprops) => {
    console.log(student)
  return (
    <div className='flex   items-center justify-between p-2 border-2 px-2 '>
     <img src={student?.profile_image?.path} className='size-10 rounded-2xl'
      alt={student.first_name +"image" } />
      
      <p className='flex justify-start'>{student.first_name}</p>
      <p  className='flex justify-start'>{student.semester}</p>
      <p  className='flex justify-start'>{student.email}</p>
      <p  className='flex justify-start'>{student.phone}</p>
      <p  className='flex justify-start'>{student.course}</p>
   
      

    </div>
    
    
  )
}

