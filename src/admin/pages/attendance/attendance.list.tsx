import type { IAttendance } from '../../../types/attedance.types'
import { AttendanceCard } from './Attendance.card'

interface IProps {
  student: IAttendance[]
  date: Date
  existingAttendance: any[]  
}

export const AttendanceList = ({ student, date, existingAttendance }: IProps) => {
  return (
    <div className='flex flex-col gap-2 w-full mt-4'>
      <p className='text-sm text-gray-500'>Students: {student.length}</p>
      {student.map((data) => (
        <AttendanceCard
          key={data._id}
          student={data}
          date={date}
          existingAttendance={existingAttendance}  
        />
      ))}
    </div>
  )
}