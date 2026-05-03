import type { IProps } from "../../../types/course.types";
import { GrUserManager } from "react-icons/gr";
import { GiDuration } from "react-icons/gi";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Deletecoursefn } from "../../../api/course.api";
import { Updatecourse } from "../../forms/update.course";

interface CardProps {
  course: IProps;
}

export const Card = ({ course }: CardProps) => {
  const queryClient = useQueryClient()

  const { mutate, isSuccess } = useMutation({
    mutationFn: (id: string) => Deletecoursefn(id),
    mutationKey: ["delete-courses-id"],
    onSuccess: (response) => {
      console.log(response)
      queryClient.invalidateQueries({ queryKey: ["courses"] })
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const [edit, setEdit] = useState(false)
  const [del, setDelete] = useState(false)

  return (
    <>
      {/* CARD */}
      <div className="bg-gray-200 border-2 rounded-2xl min-h-fit shadow-2xl text-gray-700 border-gray-300 p-5">
        
        {isSuccess && (
          <div className="text-green-600 text-sm text-center">Course deleted successfully</div>
        )}

        <div className="text-gray-700 flex flex-col gap-2 items-center justify-center">

          <div className="flex justify-between items-center gap-3">
            <p className="text-green-900 flex items-center px-2 rounded-2xl">{course._id}</p>
            <FaEdit
              className="cursor-pointer hover:size-7"
              onClick={() => setEdit(true)}
            />
            <MdDelete
              className="cursor-pointer hover:size-7"
              onClick={() => setDelete(true)}
            />
          </div>

          <p className="text-green-900 flex px-2">{course.code}</p>
          <p className="text-2xl p-2">{course.name}</p>
          <p className="flex gap-1 items-center"><GrUserManager />{course.Coordinator}</p>
          <p className="flex items-center gap-2"><GiDuration />{course.duration}</p>
          <p className="flex items-center gap-2"><RiCalendarScheduleFill />{course.schedule}</p>

        </div>
      </div>

      {/* EDIT OVERLAY */}
      {edit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setEdit(false)}
        >
          <div
            className="bg-white min-h-[30vh] min-w-[30vw] rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
       <Updatecourse 
  id={course._id} 
  course={course}  // ✅ pass course
  onSuccess={() => setEdit(false)}  // ✅ close modal
/>
          </div>
        </div>
      )}

      {/* DELETE OVERLAY */}
      {del && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setDelete(false)}
        >
          <div
            className="bg-white min-h-[30vh] min-w-[30vw] border-2 flex flex-col items-center justify-center gap-3 rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <IoIosWarning className="text-red-500 size-8" />
            <p className="text-black font-semibold">Do you want to delete {course.name}?</p>
            <p className="text-gray-500 text-sm">This action cannot be undone.</p>
            <div className="flex gap-2">
              <button
                className="bg-red-500 text-white hover:bg-red-600 rounded-2xl px-4 py-2"
                onClick={() => {
                  mutate(course._id)
                  setDelete(false)
                }}
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
    </>
  );
};