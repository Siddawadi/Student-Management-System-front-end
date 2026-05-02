import { useForm, type SubmitHandler } from 'react-hook-form'
import { Input } from '../../components/common/inputs/input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { studentupdate } from '../../api/student.api'
import { useRef } from 'react'

interface IUpdateStudentInput {
  first_name: string
  last_name: string
  email: string
  phone: string
  semester: string
}

interface Iprops {
  id: string
  onSuccess?: () => void  // close modal after update
}

export const Updatestudent = ({ id, onSuccess }: Iprops) => {
  const queryClient = useQueryClient()
  const fileRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<IUpdateStudentInput>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      semester: "",
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => studentupdate({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get all students"] })
      onSuccess?.()
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const onSubmit: SubmitHandler<IUpdateStudentInput> = (formdata) => {
    const form = new FormData()
    form.append("first_name", formdata.first_name)
    form.append("last_name", formdata.last_name)
    form.append("email", formdata.email)
    form.append("phone", formdata.phone)
    form.append("semester", formdata.semester)

    // profile image if selected
    const file = fileRef.current?.files?.[0]
    if (file) {
      form.append("profile_image", file)
    }

    mutate(form)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col min-w-fit gap-2 p-4'>

      <div className='flex min-w-fit'>
        <Input register={register} name="first_name" label="First Name"
          id="first_name" placeholder="Enter first name" error={errors?.first_name?.message} />
        <Input register={register} name="last_name" label="Last Name"
          id="last_name" placeholder="Enter last name" error={errors?.last_name?.message} />
      </div>

      <Input register={register} name="email" label="Email"
        id="email" placeholder="Enter email" error={errors?.email?.message} />

      <Input register={register} name="phone" label="Phone"
        id="phone" placeholder="Enter phone" error={errors?.phone?.message} />

      {/* Semester */}
      <div className='flex flex-col gap-1 px-5'>
        <label className='text-gray-400 text-sm'>Semester</label>
        <select {...register("semester")} className='h-10 rounded-2xl border-2 shadow-2xl'>
          <option value="">Select a semester</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={`${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} semester`}>
              {n}{n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} semester
            </option>
          ))}
        </select>
      </div>

      {/* Profile Image */}
      <div className='flex flex-col gap-1 px-5'>
        <label className='text-gray-400 text-sm'>Profile Image</label>
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          className='border rounded-lg px-3 py-2 text-sm text-gray-500'
        />
      </div>

      <div className='min-h-10 min-w-full py-5 px-5'>
        <button
          type='submit'
          disabled={isPending}
          className="min-h-10 bg-blue-500 min-w-full px-2 rounded-2xl border-2
          border-black text-white hover:border-amber-50 disabled:opacity-50"
        >
          {isPending ? "Updating..." : "Update Student"}
        </button>
      </div>

    </form>
  )
}