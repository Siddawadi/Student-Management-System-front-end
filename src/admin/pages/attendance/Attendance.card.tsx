import React, { useState, useEffect } from 'react'
import type { IAttendance } from '../../../types/attedance.types'
import { useMutation } from '@tanstack/react-query'
import { AddAttendance } from '../../../api/attendance.api'

interface Iprops {
    student: IAttendance,
    date: Date,
}

export const AttendanceCard = ({ student, date }: Iprops) => {
    const [status, setStatus] = useState("")
    const [submitted, setSubmitted] = useState(false)

    // date change हुँदा reset हुन्छ
    useEffect(() => {
        setStatus("")
        setSubmitted(false)
    }, [date])

    const { mutate, isPending } = useMutation({
        mutationFn: AddAttendance,
        onSuccess: () => {
            setSubmitted(true)  // ← success भएपछि buttons disable
        }
    })

    const handleStatus = (newStatus: string) => {
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
                <button
                    type='button'
                    disabled={isPending || submitted}
                    onClick={() => handleStatus("Present")}
                    className={`px-3 py-1 rounded-lg text-sm font-medium border transition-all
                        ${status === "Present"
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-white text-green-600 border-green-400 hover:bg-green-50"
                        } ${submitted ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    Present
                </button>
                <button
                    type='button'
                    disabled={isPending || submitted}
                    onClick={() => handleStatus("Absent")}
                    className={`px-3 py-1 rounded-lg text-sm font-medium border transition-all
                        ${status === "Absent"
                            ? "bg-red-500 text-white border-red-500"
                            : "bg-white text-red-600 border-red-400 hover:bg-red-50"
                        } ${submitted ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    Absent
                </button>
                <button
                    type='button'
                    disabled={isPending || submitted}
                    onClick={() => handleStatus("Late")}
                    className={`px-3 py-1 rounded-lg text-sm font-medium border transition-all
                        ${status === "Late"
                            ? "bg-amber-500 text-white border-amber-500"
                            : "bg-white text-amber-600 border-amber-400 hover:bg-amber-50"
                        } ${submitted ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    Late
                </button>
            </div>

            {isPending && <p className='text-xs text-gray-400'>Saving...</p>}
            {submitted && <p className='text-xs text-green-500'>✓ Saved</p>}
        </div>
    )
}