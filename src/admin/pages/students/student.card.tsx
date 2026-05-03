import { useState } from 'react';
import type { IStudent } from '../../../types/student.types';
import { FaEdit } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentdelete } from "../../../api/student.api";
import { Updatestudent } from '../../forms/update.studemt.form'; // ✅ adjust path as needed

interface Iprops {
  student: IStudent;
}

export const Studentcard = ({ student }: Iprops) => {
  const [edit, setEdit] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteStudent } = useMutation({
    mutationFn: (id: string) => studentdelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["findall"] });
      setConfirmDel(false);
    },
    
  });

  return (
    <div className='bg-gray-200 border-2 rounded-2xl min-h-fit shadow-2xl
     text-gray-700 gap-3 border-gray-300 p-5'>
        
      {student?.profile_image?.path && (
        <img
          src={student?.profile_image?.path}
          className='size-10 rounded-2xl'
          alt={student?.first_name + " image"}
        />
      )}

      <div className='min-w-full flex justify-center items-center gap-2 px-3'>
        <p className='text-xs font-semibold mr-7'>id: {student._id}</p>
        <FaEdit
          onClick={() => setEdit(true)}
          className='size-6 hover:size-7 cursor-pointer text-black'
        />
        <MdDelete
          onClick={() => setConfirmDel(true)}
          className='size-6 hover:size-7 cursor-pointer text-black'
        />
      </div>

      <div className='flex flex-col gap-3 my-2'>
        <p className='flex justify-start text-2xl shadow-2xs p-2'>
          {student.first_name} {student.last_name}
        </p>
        <p className='flex mx-2 justify-start'>{student.semester}</p>
        <p className='flex justify-start'>✉️ {student.email}</p>
        <p className='flex justify-start items-center'>
          <FaPhoneAlt /> {student.phone}
        </p>
      </div>

      {/* Edit Popup */}
      {edit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setEdit(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 min-w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-gray-700 p-4">Edit Student</h2>
           <Updatestudent 
  id={student._id} 
  student={student} 
 onSuccess={async () => {
  await queryClient.invalidateQueries()  
  setEdit(false)
}}
/>
          </div>
        </div>
      )}

      {/* Confirm Delete Popup */}
      {confirmDel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setConfirmDel(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-gray-700">Confirm Delete</h2>
            <p className="text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-500">
                {student.first_name} {student.last_name}
              </span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDel(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteStudent(student._id)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};