

import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { studentlaw } from '../../../../../api/student.api'
import { Datanotfound } from '../../../../../components/common/datanotfound'
import { DataLoading } from '../../../../../components/common/DataLoading'
import { StudentList } from '../student.lists'

export const Studentlaw = () => {
const [semester,setSemester]=useState("")
    const {data,isLoading,isPending,isError,isSuccess}=useQuery({
        queryKey:["get-all-law",semester],
        queryFn:()=>studentlaw(semester),
        enabled:!!semester,

    })
    
  return (
    <div className='my-4 '>
        <label className='mr-2 font-semibold' htmlFor="semester">Semester</label>
<select value={semester} id='semester'  className='h-10 px-3 rounded-xl border-2 shadow-md'
disabled={isLoading}
onChange={(e)=>{
    setSemester(e.target.value)
    console.log(e.target.value)

}}



>
    <option value="">select a semester</option>
    <option value="1st semester">1st Semester</option>
    <option value="2nd semester">2nd semester</option>
    <option value="3rd semester">3rd semester</option>
     <option value="4th semester">4th semester</option>
    <option value="5th semester">5th semester</option>
     <option value="6th semester">6th semester</option>
    <option value="7th semester">7th semester</option>
    <option value="8th semester">8th semester</option>
</select>
{!semester && 
<p>please select a semester</p>
}
{isError && 
<p>error occured</p>
}
{ isSuccess && 
<p className='text-red-500'>{isSuccess}</p>


}
    {isLoading && <DataLoading/>}

    {!isLoading && data?.data?.length >0 &&(
        <StudentList  students={data.data}/>
    )}
     {!isLoading && data?.data?.length ===0 && <Datanotfound/>}

    </div>
  )
}
