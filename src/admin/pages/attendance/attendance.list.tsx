import React from 'react'
import type { IAttendance } from '../../../types/attedance.types'
import { AttendanceCard } from './Attendance.card'
interface IProps{
    student:IAttendance[]
    date:Date
}
export const AttendanceList = ({student,date}:IProps) => {
    console.log("todays date is ",date)
  return (
    <div className='min-h-screen grid grid-cols-1 w-screen'>
        <p> no of Students {student.length}</p>

        {
            student.map((data)=><AttendanceCard key={data._id} student={data} date={date}/>)
        }
    </div>
  )
}
