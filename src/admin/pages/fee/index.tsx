import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { CourseFn } from '../../../api/course.api'
import type { IProps } from '../../../types/course.types'
import { getfeebysemandcourse } from '../../../api/fee.api'
import { DataLoading } from '../../../components/common/DataLoading'
import { Feelist } from './feelist'
import { Datanotfound } from '../../../components/common/datanotfound'
export const Fee = () => {
    const [semester, setSemester] = useState("")
    const [course, setCourse] = useState("")

    const { data: courseData, isLoading: courseLoading } = useQuery({
        queryFn: CourseFn,
        queryKey: ["get-all-courses"]
    })
       

    const { data: feeData, isLoading: feeLoading } = useQuery({
        queryFn: () => getfeebysemandcourse(semester, course),
        queryKey: ["get-fee", semester, course],
        enabled: !!semester && !!course
    })
    console.log(semester)
    console.log(course)
    

    return (
        <div className='flex-col flex px-3'>
            <div className='flex items-center gap-2'>

                <label htmlFor="semester">Semester</label>
                <select
                    value={semester}
               
                    id="semester"
                    className='h-10 rounded-2xl border-2 border-black border-solid w-40'
                    onChange={(e) => setSemester(e.target.value)}
                >
                    <option value="">Select Semester</option>
                    <option value="1st semester">1st semester</option>
                    <option value="2nd semester">2nd semester</option>
                    <option value="3rd semester">3rd semester</option>
                    <option value="4th semester">4th semester</option>
                    <option value="5th semester">5th semester</option>
                    <option value="6th semester">6th semester</option>
                    <option value="7th semester">7th semester</option>
                    <option value="8th semester">8th semester</option>
                </select>
                

                <label htmlFor="course">Course</label>
                <select
                    value={course}
                    id="course"
                    className='h-10 rounded-2xl border-2 border-black border-solid w-fit'
                    onChange={(e) => setCourse(e.target.value)}
                >
                    <option value="">Select Course</option>
                    {courseLoading && <option>Loading...</option>}
                    {courseData?.data?.map((item: IProps) => (
                        <option key={item._id} value={item._id}>{item.name}</option>
                    ))}
                </select>
                
                
            </div>

            {feeLoading && <DataLoading/>} 

            {!feeLoading && feeData?.data.length >0 &&
            (
                <Feelist fees={feeData.data} semester={semester} course={course} />
            ) }

            {!feeLoading && feeData?.data.length ===0 && 
            <Datanotfound/>
            }

            
           
        </div>
    )
}