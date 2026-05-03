import type { updateFeeInput } from "../../types/fee.types"
import { Input } from "../../components/common/inputs/input"
import { useForm, type SubmitHandler, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateFesSchema } from "../../schemas/fee.schema"
import { updatebyid } from "../../api/fee.api"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface Ifee {
  semester: string
  course: string
  id: string,
  onSuccess:()=>void
}

export const Updatefee = ({ id, course, semester, onSuccess }: Ifee) => {

  const { register, handleSubmit, control,reset, formState: { errors } } = useForm({
    defaultValues: {
      amount: 100,
      paidDate: new Date(),
      dueDate: new Date(),
      status: "",
    },
    resolver: yupResolver(updateFesSchema)
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: updateFeeInput) => updatebyid(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-fee", semester, course] })
      reset(),
      onSuccess?.()
    }
  })

  const onSubmit: SubmitHandler<updateFeeInput> = (formdata) => {
    mutate(formdata)
  }

  return (
    <div className='flex flex-col gap-4 p-4 w-full rounded-2xl'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

        {/* Status */}
        <div className='flex flex-col gap-1'>
          <label htmlFor="status" className='text-sm font-medium text-gray-700'>Status</label>
          <select
            {...register("status")}
            id="status"
            className='h-10 rounded-xl border-2 border-gray-300 px-3 text-sm focus:outline-none focus:border-green-700'
          >
            <option value="">Please select a status</option>
            <option value="paid">Paid</option>
            <option value="due">Due</option>
          </select>
          {errors?.status && (
            <p className='text-xs text-red-500'>{errors.status.message}</p>
          )}
        </div>

        {/* Amount */}
        <Input register={register} name="amount" id="amount"
          label="Amount" placeholder="Enter the amount" error={errors?.amount?.message} />

        {/* Paid Date */}
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-gray-700'>Paid Date</label>
          <Controller
            control={control}
            name="paidDate"
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date: Date | null) => field.onChange(date)}
                placeholderText="Select paid date"
                dateFormat="yyyy-MM-dd"
                className='h-10 w-full rounded-xl border-2 border-gray-300 px-3 text-sm focus:outline-none focus:border-green-700'
              />
            )}
          />
          {errors?.paidDate && (
            <p className='text-xs text-red-500'>{errors.paidDate.message}</p>
          )}
        </div>

        {/* Due Date */}
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-gray-700'>Due Date</label>
          <Controller
            control={control}
            name="dueDate"
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date: Date | null) => field.onChange(date)}
                placeholderText="Select due date"
                dateFormat="yyyy-MM-dd"
                className='h-10 w-full rounded-xl border-2 border-gray-300 px-3 text-sm focus:outline-none focus:border-green-700'
              />
            )}
          />
          {errors?.dueDate && (
            <p className='text-xs text-red-500'>{errors.dueDate.message}</p>
          )}
        </div>

        <button
          type='submit'
          disabled={isPending}
          className='h-10 bg-green-700 text-white rounded-xl border-2 border-transparent hover:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-sm font-medium'
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>

      </form>
    </div>
  )
}