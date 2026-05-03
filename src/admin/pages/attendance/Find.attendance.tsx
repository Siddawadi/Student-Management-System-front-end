import  { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CourseFn } from '../../../api/course.api'
import { FindAttendance, DeleteAttendance, DeleteAllAttendance } from '../../../api/attendance.api'
import type { IProps } from '../../../types/course.types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DataLoading } from '../../../components/common/DataLoading'
import { Link } from 'react-router'
export const Findattendance = () => {
  const [course, setCourse] = useState("")
  const [semester, setSemester] = useState("")
  const queryClient = useQueryClient()

  const { control, watch } = useForm({
    defaultValues: { date: new Date() }
  })

  const selectedDate = watch("date")

  const { data: courseData, isLoading: courseLoading } = useQuery({
    queryFn: CourseFn,
    queryKey: ["get-all-courses"]
  })

  const { data: attendanceData, isLoading } = useQuery({
    queryFn: () => FindAttendance(course, semester, selectedDate),
    queryKey: ["find-attendance", course, semester, selectedDate],
    enabled: !!course && !!semester && !!selectedDate
  })

  const { mutate: deleteOne } = useMutation({
    mutationFn: (id: string) => DeleteAttendance(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["find-attendance"] })
    }
  })

  const { mutate: deleteAll, isPending: deletingAll } = useMutation({
    mutationFn: () => DeleteAllAttendance(course, semester, selectedDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["find-attendance"] })
    }
  })

  return (
    <div className='flex flex-col w-full h-screen overflow-hidden p-4 gap-4'>
 
      {/* Filters */}
      <div className='flex flex-wrap gap-3 items-center'>
         <Link to="/admin/attendance" className='border w-fit px-4 py-2 text-white bg-green-700 rounded-lg'> back</Link>
        <select
          onChange={(e) => setCourse(e.target.value)}
          disabled={courseLoading}
          className='h-10 rounded-xl border-2 border-gray-300 px-3 flex-1 min-w-0'
        >
          <option value="">Select Course</option>
          {courseData?.data?.map((items: IProps) => (
            <option value={items._id} key={items._id}>{items.name}</option>
          ))}
        </select>

        <select
          onChange={(e) => setSemester(e.target.value)}
          className='h-10 rounded-xl border-2 border-gray-300 px-3 flex-1 min-w-0'
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

        <Controller
          control={control}
          name='date'
          render={({ field }) => (
            <DatePicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date: Date | null) => field.onChange(date)}
              placeholderText='Select date'
              dateFormat="yyyy-MM-dd"
              className='h-10 rounded-xl border-2 border-gray-300 px-3'
            />
          )}
        />
      </div>

      {/* Results */}
      <div className='flex-1 overflow-y-auto'>
        {isLoading && <DataLoading />}

        {!isLoading && attendanceData?.data?.length > 0 && (
          <>
            {/* Total + Delete All */}
            <div className='flex items-center justify-between mb-2'>
              <p className='text-xs text-gray-400'>Total: {attendanceData.data.length} records</p>
              <button
                onClick={() => deleteAll()}
                disabled={deletingAll}
                className='text-xs px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all'
              >
                {deletingAll ? "Deleting..." : "Delete All"}
              </button>
            </div>

            {/* Header */}
            <div className='grid grid-cols-5 px-4 py-2 text-xs text-gray-400 font-semibold uppercase border-b gap-4'>
              <p>Name</p>
              <p>Phone</p>
              <p>Date</p>
              <p>Status</p>
              <p>Action</p>
            </div>

            {/* Rows */}
            {attendanceData.data.map((att: any) => (
              att.student ? (
                <div key={att._id} className='grid grid-cols-5 px-4 py-3 border-b gap-4 items-center'>
                  <p className='text-sm truncate'>
                    {att.student.first_name} {att.student.last_name}
                  </p>
                  <p className='text-sm text-gray-500'>{att.student.phone}</p>
                  <p className='text-sm text-gray-500'>
                    {new Date(att.date).toLocaleDateString()}
                  </p>
                  <span className={`text-xs font-medium px-2 py-1 rounded-lg w-fit
                    ${att.status === "Present" ? "bg-green-100 text-green-700" :
                      att.status === "Absent" ? "bg-red-100 text-red-700" :
                      "bg-amber-100 text-amber-700"}`}>
                    {att.status}
                  </span>
                  <button
                    onClick={() => {
                        console.log("deleting id:", att._id)

                        deleteOne(att._id)}
                    }
                    className='text-xs px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all w-fit'
                  >
                    Delete
                  </button>
                </div>
              ) : null
            ))}
          </>
        )}

        {!isLoading && course && semester && attendanceData?.data?.length === 0 && (
          <p className='text-center text-gray-400 mt-10'>No records found</p>
        )}

        {(!course || !semester) && (
          <p className='text-center text-gray-400 mt-10'>Please select course, semester and date</p>
        )}
      </div>
    </div>
  )
}