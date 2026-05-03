import { useState } from 'react'
import type { IIfees } from '../../../types/fee.types';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { delbyid } from '../../../api/fee.api';
import { Updatefee } from '../../forms/update.fee';

interface Icard {
    fee: IIfees,
    semester: string,
    course: string,
    onSuccess?: () => void  // ✅ add this
}

export const Feecard = ({ fee, semester, course }: Icard) => {
    const queryClient = useQueryClient()
    const [del, setDelete] = useState(false)
    const [edit, setEdit] = useState(false)

    const { mutate } = useMutation({
        mutationFn: (id: string) => delbyid(id),
        onSuccess: () => {
            setDelete(false)
            queryClient.invalidateQueries({ queryKey: ["get-fee", semester, course] })
        }
    })

    const pdate = new Date(fee.paidDate).toLocaleDateString()
    const ddate = new Date(fee.dueDate).toLocaleDateString()

    return (
        // ✅ overflow-hidden stops horizontal blowout
     <div className='bg-gray-200 border-2 rounded-2xl shadow-2xl flex flex-col items-center text-gray-700 p-4 gap-3 overflow-hidden w-full'>

            {/* Header row */}
            <div className='flex w-full justify-between items-center'>
                {/* ✅ truncate stops id from overflowing */}
                <p className='text-xs font-semibold truncate flex-1'>{fee._id}</p>
                <div className='flex gap-2 shrink-0'>
                    <MdDelete
                        className='size-6 hover:size-7 cursor-pointer text-black'
                        onClick={() => setDelete(true)}
                    />
                    <FaEdit
                        className='size-6 hover:size-7 cursor-pointer text-black'
                        onClick={() => setEdit(true)}
                    />
                </div>
            </div>

            <p>Name: {fee?.student?.first_name} {fee?.student?.last_name}</p>

            {fee.status === "paid" && (
                <div className='flex flex-col items-center'>
                    <p>Status: {fee.status}</p>
                    <p>Paid Date: {pdate}</p>
                </div>
            )}

            {fee.status === "due" && (
                <div className='flex flex-col items-center'>
                    <p>Status: {fee.status}</p>
                    <p>Due Date: {ddate}</p>
                </div>
            )}

            <p>Amount: {fee.amount}</p>

            {/* Delete Modal */}
            {del && (
                <div
                    onClick={() => setDelete(false)}
                    className='fixed z-50 inset-0 bg-black/80 flex items-center justify-center'
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className='bg-white min-h-[30vh] min-w-[35vw] rounded-2xl p-6 flex flex-col items-center gap-2'
                    >
                        <IoIosWarning className="text-red-500 size-8" />
                        <p className='text-black font-semibold'>Delete {fee?.student?.first_name}'s fee?</p>
                        <p className="text-gray-500 text-sm">This action cannot be undone.</p>
                        <div className='flex gap-2'>
                            <button
                                className="bg-red-500 text-white hover:bg-red-600 rounded-2xl px-4 py-2"
                                onClick={() => mutate(fee._id)}
                            >
                                Confirm
                            </button>
                            <button
                                className="bg-gray-200 hover:bg-gray-300 rounded-2xl px-4 py-2"
                                onClick={() => setDelete(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {edit && (
                <div
                    className='fixed z-50 inset-0 bg-black/80 flex items-center justify-center'
                    onClick={() => setEdit(false)}
                >
                    <div
                        className='bg-white rounded-2xl min-w-[350px] w-[400px] p-4'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Updatefee
                            id={fee._id}
                            course={course}
                            semester={semester}
                            onSuccess={() => setEdit(false)}  // ✅ closes modal after update
                        />
                    </div>
                </div>
            )}
        </div>
    )
}