import { useState, useEffect } from 'react'
import type { IAttendance } from '../../../types/attedance.types'
import { useMutation } from '@tanstack/react-query'
import { AddAttendance } from '../../../api/attendance.api'

interface Iprops {
  student: IAttendance
  date: Date
  existingAttendance: any[]  
}

export const AttendanceCard = ({ student, date, existingAttendance }: Iprops) => {
  // ✅ check if this student already has attendance recorded
  const existing = existingAttendance.find(
    (att) => att.student?._id === student._id
  )

  const [status, setStatus] = useState(existing?.status ?? "")
  const [submitted, setSubmitted] = useState(!!existing)  

  // reset when date changes
  useEffect(() => {
    const found = existingAttendance.find((att) => att.student?._id === student._id)
    setStatus(found?.status ?? "")
    setSubmitted(!!found)
  }, [date, existingAttendance])

  const { mutate, isPending } = useMutation({
    mutationFn: AddAttendance,
    onSuccess: () => {
      setSubmitted(true)
    },
    onError: () => {
      setStatus("")
      setSubmitted(false)
    }
  })

  const handleStatus = (newStatus: string) => {
    if (submitted || isPending) return
    setStatus(newStatus)
    mutate({
      student: student._id,
      course: student.course._id,
      date: date,
      status: newStatus,
      semester: student.semester
    })
  }

  return (
    <div className='flex items-center justify-between border rounded-xl w-[85vw] py-3 px-4'>
      <p>{student.first_name} {student.last_name}</p>
      <p>{student.phone}</p>
      <p>{date.toLocaleDateString()}</p>

      <div className='flex gap-2'>
        {(["Present", "Absent", "Late"] as const).map((s) => {
          const colors = {
            Present: { active: "bg-green-500 border-green-500 text-white", idle: "text-green-600 border-green-400 hover:bg-green-50" },
            Absent:  { active: "bg-red-500 border-red-500 text-white",   idle: "text-red-600 border-red-400 hover:bg-red-50" },
            Late:    { active: "bg-amber-500 border-amber-500 text-white", idle: "text-amber-600 border-amber-400 hover:bg-amber-50" },
          }
          return (
            <button
              key={s}
              type='button'
              disabled={isPending || submitted}
              onClick={() => handleStatus(s)}
              className={`px-3 py-1 rounded-lg text-sm font-medium border transition-all
                ${status === s ? colors[s].active : `bg-white ${colors[s].idle}`}
                ${submitted ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {s}
            </button>
          )
        })}
      </div>

      <div className='w-16 text-right'>
        {isPending && <p className='text-xs text-gray-400'>Saving...</p>}
        {submitted && <p className='text-xs text-green-500'>✓ Saved</p>}
      </div>
    </div>
  )
}