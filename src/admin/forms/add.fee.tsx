import { Input } from '../../components/common/inputs/input'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { studentfn } from '../../api/student.api'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { IStudent } from '../../types/student.types'
import { CourseFn } from '../../api/course.api'
import type { IProps } from '../../types/course.types'
import type { feeInput } from '../../types/fee.types'
import { feeschema } from '../../schemas/fee.schema'
import { Addfeeapi } from '../../api/fee.api'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaRegCalendarAlt } from "react-icons/fa";


export const Addfee = () => {

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            student: "",
            course: "",
            semester: "",
            amount: 5000,
            paidDate: new Date(Date.now()),
            dueDate: new Date(Date.now()),
            status: ""
        },
        resolver: yupResolver(feeschema)
    })

    const { data: studentData, isLoading: studentLoading } = useQuery({
        queryFn: studentfn,
        queryKey: ["find-all-students"]
    })

    const { data: courseData, isLoading: courseLoading } = useQuery({
        queryFn: CourseFn,
        queryKey: ['get-all-courses']
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (data: feeInput) => Addfeeapi(data)
    })

    const onSubmit: SubmitHandler<feeInput> = (formData) => {
        console.log(formData)
        mutate(formData)
    }

    return (
        <div className='flex justify-center items-center min-h-full min-w-full'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center border-2 rounded-2xl gap-2 p-2'>
                <p>Add Fee</p>

                {/* Student */}
                <select
                    {...register("student")}
                    id="student"
                    disabled={studentLoading}
                    className='h-10 min-w-full rounded-2xl border-2 p-2'
                >
                    <option value="">Select a student</option>
                    {studentData?.data?.map((items: IStudent) => (
                        <option value={items._id} key={items._id}>
                            {items.first_name} {items.last_name}
                        </option>
                    ))}
                </select>
                {errors.student?.message && (
                    <p className='text-red-400 text-xs'>{errors.student.message}</p>
                )}

                {/* Course */}
                <select
                    className='h-10 min-w-full rounded-2xl border-2 p-2'
                    {...register("course")}
                    id="course"
                    disabled={courseLoading}
                >
                    <option value="">Please select a course</option>
                    {courseData?.data?.map((items: IProps) => (
                        <option value={items._id} key={items._id}>{items.name}</option>
                    ))}
                </select>
                {errors.course?.message && (
                    <p className='text-red-400 text-xs'>{errors.course.message}</p>
                )}

                {/* Semester */}
                <div className='flex flex-col p-5'>
                    <label>Semester</label>
                    <select {...register("semester")} className='h-10 min-w-full rounded-2xl border-2 p-2'>
                        <option value="">Select a semester</option>
                        <option value="1st semester">1st semester</option>
                        <option value="2nd semester">2nd semester</option>
                        <option value="3rd semester">3rd semester</option>
                        <option value="4th semester">4th semester</option>
                        <option value="5th semester">5th semester</option>
                        <option value="6th semester">6th semester</option>
                        <option value="7th semester">7th semester</option>
                        <option value="8th semester">8th semester</option>
                    </select>
                    {errors.semester?.message && (
                        <p className='text-red-400 text-xs'>{errors.semester.message}</p>
                    )}
                </div>

                {/* Amount */}
                <Input
                    register={register}
                    name={"amount"}
                    id={"amount"}
                    label={"Amount"}
                    placeholder={"Enter the amount"}
                    error={errors?.amount?.message}
                />

               {/* Paid Date */}
<div className='flex flex-col w-full gap-1 px-2'>
    <label className='text-sm'>Paid Date</label>
    <Controller
        control={control}
        name="paidDate"
        render={({ field }) => (
            <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date: Date | null) => field.onChange(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select paid date"
                customInput={
                    <button type="button" className='h-10 w-full rounded-2xl border-2 p-2 flex items-center gap-2'>
                        <FaRegCalendarAlt />
                        <span>{field.value ? new Date(field.value).toLocaleDateString() : "Select paid date"}</span>
                    </button>
                }
            />
        )}
    />
    {errors.paidDate?.message && (
        <p className='text-red-400 text-xs'>{errors.paidDate.message}</p>
    )}
</div>

{/* Due Date */}
<div className='flex flex-col justify-between w-full gap-1 px-2'>
    <label className='text-sm'>Due Date</label>
    <Controller
        control={control}
        name="dueDate"
        render={({ field }) => (
            <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date: Date | null) => field.onChange(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select due date"
                customInput={
                    <button type="button" className='h-10 w-full rounded-2xl border-2 p-2 flex items-center gap-2 justify-between'>
                        
                        <span>{field.value ? new Date(field.value).toLocaleDateString() : "Select due date"}</span>
                        <FaRegCalendarAlt className='mr-3'  />
                    </button>
                }
            />
        )}
    />
    {errors.dueDate?.message && (
        <p className='text-red-400 text-xs'>{errors.dueDate.message}</p>
    )}
</div>

                {/* Status */}
                <select
                    {...register("status")}
                    id="status"
                    className='h-10 min-w-full rounded-2xl border-2 p-2'
                >
                    <option value="">Select status</option>
                    <option value="paid">Paid</option>
                    <option value="due">Due</option>
                </select>
                {errors.status?.message && (
                    <p className='text-red-400 text-xs'>{errors.status.message}</p>
                )}

                <div className='min-h-10 min-w-full py-5'>
                    <button
                        type='submit'
                        disabled={isPending}
                        className="min-h-10 bg-green-900 min-w-full px-2 rounded-2xl border-2 border-black hover:border-2 text-white hover:border-amber-50"
                    >
                        {isPending ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    )
}