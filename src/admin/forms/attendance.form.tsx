import React, { useState } from 'react'
import { Input } from '../../components/common/inputs/input'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CourseFn } from '../../api/course.api'
import type { IProps } from '../../types/course.types'
import DatePicker from 'react-datepicker'
import { findbySemesterandCourse } from '../../api/student.api'
import { DataLoading } from '../../components/common/DataLoading'
import { AttendanceList } from '../pages/attendance/attendance.list'
import { Link } from 'react-router'


export const Attendanceform = () => {
  const [semester, setSemester] = useState("")
  const [course, setCourse] = useState("")

  const { register, control, watch } = useForm({
    defaultValues: {
      date: new Date()
    }
  })

  // Controller बाहिर date access गर्न watch प्रयोग गर्छौं
  const selectedDate = watch("date")
  console.log("selected date outside controller:", selectedDate)

  const { data: studentData, isLoading: studentLoading } = useQuery({
    queryFn: () => findbySemesterandCourse(semester, course),
    queryKey: ["findbySemesterandCourse", semester, course],
    enabled: !!semester && !!course
  })

  const { data: courseData, isLoading: courseLoading } = useQuery({
    queryFn: CourseFn,
    queryKey: ["get-all-courses"]
  })

  const onSubmit = () => {
    // यहाँ तीनवटै data available छ
    console.log({
      semester,
      course,
      date: selectedDate
    })
  }

  return (
    <div className='flex-col flex  min-h-screen min-w-full'>
      <div className='flex gap-4'>

        {/* Course Select */}
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

        {/* Semester Select */}
        <select
          onChange={(e) => setSemester(e.target.value)}
          className='h-10 rounded-2xl border-2 border-black border-solid w-40'
          id="semester"
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

        {/* Date Picker */}
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

        {/* Submit Button */}
        <Link to="/admin/findattendance"  className='h-10 px-4 bg-green-700 text-white rounded-2xl'> find attendance</Link>
          
         
       
         
        

      </div>

      {/* Student List */}
      {studentLoading && <DataLoading />}
      {!studentLoading && studentData?.data?.length > 0 && (
        <AttendanceList student={studentData.data} date={selectedDate} />
      )}

    </div>
  )
}