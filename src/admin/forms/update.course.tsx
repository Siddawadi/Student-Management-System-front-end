import { useForm, type SubmitHandler } from 'react-hook-form'
import { Input } from '../../components/common/inputs/input'
import { yupResolver } from '@hookform/resolvers/yup'
import { updatecourseSchema } from '../../schemas/add.courses.schema'
import type { updatecourseINput, IProps } from '../../types/course.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCourse } from '../../api/course.api'

interface Istring {
  id: string
  course: IProps  // ✅ add course data
  onSuccess?: () => void
}

export const Updatecourse = ({ id, course, onSuccess }: Istring) => {
  const queryClient = useQueryClient()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: course.name,              // ✅ prefill
      code: course.code,
      Coordinator: course.Coordinator,
      schedule: course.schedule,
      duration: course.duration,
    },
    resolver: yupResolver(updatecourseSchema)
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: updatecourseINput) => updateCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] })
      onSuccess?.()  // ✅ close modal
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const onSubmit: SubmitHandler<updatecourseINput> = (formdata) => {
    mutate(formdata)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input register={register} name={"name"} label={'Name'} id={'name'}
          placeholder={'enter course name'} error={errors?.name?.message} />
        <Input register={register} name={"code"} label={'Code'} id={'code'}
          placeholder={'enter course code'} error={errors?.code?.message} />
        <Input register={register} name={"Coordinator"} label={'Coordinator'} id={'Coordinator'}
          placeholder={'enter course Coordinator'} error={errors?.Coordinator?.message} />
        <Input register={register} name={"schedule"} label={'Schedule'} id={'schedule'}
          placeholder={'enter course schedule'} error={errors?.schedule?.message} />
        <Input register={register} name={"duration"} label={'Duration'} id={'duration'}
          placeholder={'enter course duration'} error={errors?.duration?.message} />
        <div className='min-h-10 min-w-full py-10'>
          <button disabled={isPending} type='submit'
            className="min-h-10 text-amber-50 bg-blue-400 min-w-full rounded-2xl hover:border-2 hover:border-amber-50">
            {isPending ? "Updating..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}