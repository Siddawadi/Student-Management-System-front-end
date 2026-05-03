import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { CourseFn } from '../../api/course.api'
import type { IProps } from '../../types/course.types'
import DatePicker from 'react-datepicker'
import { findbySemesterandCourse } from '../../api/student.api'
import { DataLoading } from '../../components/common/DataLoading'
import { AttendanceList } from '../pages/attendance/attendance.list'
import { FindAttendance } from '../../api/attendance.api'  // ✅ import
import { Link } from 'react-router'

export const Attendanceform = () => {
  const [semester, setSemester] = useState("")
  const [course, setCourse] = useState("")

  const { control, watch } = useForm({
    defaultValues: { date: new Date() }
  })

  const selectedDate = watch("date")

  const { data: studentData, isLoading: studentLoading } = useQuery({
    queryFn: () => findbySemesterandCourse(semester, course),
    queryKey: ["findbySemesterandCourse", semester, course],
    enabled: !!semester && !!course
  })

  const { data: courseData, isLoading: courseLoading } = useQuery({
    queryFn: CourseFn,
    queryKey: ["get-all-courses"]
  })

  // ✅ fetch existing attendance for this course + semester + date
  const { data: attendanceData } = useQuery({
    queryFn: () => FindAttendance(course, semester, selectedDate),
    queryKey: ["find-attendance", course, semester, selectedDate],
    enabled: !!course && !!semester && !!selectedDate
  })

  return (
    <div className='flex-col flex min-h-screen min-w-full'>
      <div className='flex gap-4'>

        <select
          id="course"
          onChange={(e) => setCourse(e.target.value)}
          className='h-10 rounded-2xl border-2 border-black border-solid w-fit'
          disabled={courseLoading}
        >
          <option value="">Select a course</option>
          {courseData?.data?.map((items: IProps) => (
            <option value={items._id} key={items._id}>{items.name}</option>
          ))}
        </select>

        <select
          onChange={(e) => setSemester(e.target.value)}
          className='h-10 rounded-2xl border-2 border-black border-solid w-40'
          id="semester"
        >
          <option value="">Select Semester</option>
          {["1st","2nd","3rd","4th","5th","6th","7th","8th"].map((n) => (
            <option key={n} value={`${n} semester`}>{n} semester</option>
          ))}
        </select>

        <Controller
          control={control}
          name='date'
          render={({ field }) => (
            <DatePicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date: Date | null) => field.onChange(date)}
              placeholderText='Enter a date'
              dateFormat="yyyy-MM-dd"
              className='h-10 rounded-2xl border-2 border-black p-2'
            />
          )}
        />

        <Link to="/admin/findattendance" className='h-10 px-4 bg-green-700 text-white rounded-2xl'>
          find attendance
        </Link>

      </div>

      {studentLoading && <DataLoading />}
      {!studentLoading && studentData?.data?.length > 0 && (
        <AttendanceList
          student={studentData.data}
          date={selectedDate}
          existingAttendance={attendanceData?.data ?? []}  // ✅ pass down
        />
      )}
    </div>
  )
}