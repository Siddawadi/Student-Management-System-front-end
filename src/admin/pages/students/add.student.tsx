import { AddstudentSchema } from '../../../schemas/add.student.schema'
import { Input } from '../../../components/common/inputs/input'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import type { StudentInput } from '../../../types/student.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { StudentINputFN } from '../../../api/student.api'
import { CourseFn } from '../../../api/course.api'
import type { IProps } from '../../../types/course.types'
import { useState } from 'react'                          // 👈 added

export const Addstudent = () => {
  const queryClient = useQueryClient()

  // 👇 added
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentInput>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone: '',
      course: '',
      semester: '',
    },
    resolver: yupResolver(AddstudentSchema),
  })

  const { data: courseData, isLoading: coursesLoading } = useQuery({
    queryFn: CourseFn,
    queryKey: ['courses'],
  })

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: StudentINputFN,
    onSuccess: (response) => {
      console.log(response)
      queryClient.invalidateQueries({ queryKey: ['all-students'] })
      reset()
      setPhotoFile(null)   
      setPreview(null)     
    },
    onError: (error) => {
      console.error(error)
    },
  })

  // 👇 added
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const onSubmit: SubmitHandler<StudentInput> = (formdata) => {
    const fd = new FormData()                         // 👈 changed to FormData
    fd.append('first_name', formdata.first_name)
    fd.append('last_name', formdata.last_name)
    fd.append('email', formdata.email)
    fd.append('password', formdata.password)
    fd.append('phone', formdata.phone)
    fd.append('course', formdata.course)
    fd.append('semester', formdata.semester)
    if (photoFile) fd.append('photo', photoFile)      // 👈 added
    mutate(fd as any)
  }

  return (
    <main className="min-h-screen h-screen bg-olive-200 flex flex-col justify-center items-center">
      <div
        className="border-blue-300 border min-w-fit min-h-80 w-80 bg-white shadow-2xl
        shadow-blue-950 rounded-2xl flex flex-col justify-start items-center gap-2 text-gray-400"
      >
        <div className="flex flex-col items-center gap-2 p-2">
          <p className="font-semibold text-2xl">Add Students</p>

          {/* 👇 added — photo upload */}
          <div className="flex flex-col items-center gap-1">
            <div className="relative w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-400">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-gray-400 text-center px-1">Upload Photo</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            {preview && (
              <button
                type="button"
                onClick={() => { setPhotoFile(null); setPreview(null) }}
                className="text-xs text-red-400"
              >
                Remove
              </button>
            )}
          </div>
          {/* 👆 end photo upload */}

          <form onSubmit={handleSubmit(onSubmit)} className="min-w-78">
            {isError && (
              <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
            )}
            {isSuccess && (
              <p className="text-green-600 text-sm">Student added successfully!</p>
            )}

            <div className="flex">
              <Input
                register={register}
                name="first_name"
                label="First Name"
                id="first_name"
                placeholder="Enter first name"
                error={errors?.first_name?.message}
              />
              <Input
                register={register}
                name="last_name"
                label="Last Name"
                id="last_name"
                placeholder="Enter last name"
                error={errors?.last_name?.message}
              />
            </div>

            <Input
              register={register}
              name="password"
              type="password"
              label="Password"
              id="password"
              placeholder="Enter password"
              error={errors?.password?.message}
            />

            <Input
              register={register}
              name="email"
              label="Email"
              id="email"
              placeholder="Enter email"
              error={errors?.email?.message}
            />

            <Input
              register={register}
              name="phone"
              label="Phone"
              id="phone"
              placeholder="Enter phone"
              error={errors?.phone?.message}
            />

            {/* Course dropdown */}
            <div className="flex flex-col gap-1 py-2 p-5">
              <label className="text-gray-400 text-sm">Course</label>
              <select
                {...register('course')}
                className="border text-black rounded-lg px-3 py-2 w-full"
              >
                <option value="">
                  {coursesLoading ? 'Loading courses...' : 'Select a course'}
                </option>
                {courseData?.data?.map((course: IProps) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
              {errors?.course?.message && (
                <p className="text-red-400 text-xs">{errors.course.message}</p>
              )}
            </div>

            {/* Semester dropdown */}
            <div className="flex flex-col p-5">
              <label className="text-gray-400 text-sm">Semester</label>
              <select
                {...register('semester')}
                className="h-10 rounded-2xl border-2 shadow-2xl"
              >
                <option value="">Select a semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={`${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} semester`}>
                    {n}{n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} semester
                  </option>
                ))}
              </select>
              {errors?.semester?.message && (
                <p className="text-red-400 text-xs">{errors.semester.message}</p>
              )}
            </div>

            <div className="min-h-10 min-w-full py-5">
              <button
                type="submit"
                disabled={isPending}
                className="min-h-10 bg-green-900 min-w-full px-2 rounded-2xl border-2
                border-black hover:border-2 text-white hover:border-amber-50 disabled:opacity-50"
              >
                {isPending ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
