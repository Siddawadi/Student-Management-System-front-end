import type { IIfees, updateFeeInput } from "../../types/fee.types"
import { Input } from "../../components/common/inputs/input"
import { useForm, type SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateFesSchema } from "../../schemas/fee.schema"
import { updatebyid } from "../../api/fee.api"
interface Ifee{
  semester:string,
  course:string,
   id:string
}




export const Updatefee = ({id,course,semester}:Ifee) => {
  
  const {register,handleSubmit,formState:{errors},}=useForm({
    defaultValues:{
      amount:100,
      paidDate: new Date(),
      dueDate:new Date(),
      status:"".toLocaleLowerCase(),

    },resolver:yupResolver(updateFesSchema)

  })
  const queryClient = useQueryClient()
    const {mutate,isPending}=useMutation({
      
      mutationFn:(data:updateFeeInput)=>updatebyid(id,data),
      onSuccess:()=>{
        queryClient.invalidateQueries({ queryKey: ["get-fee", semester, course] })

      }
    })


     const onSubmit:SubmitHandler<updateFeeInput>=(formdata)=>{
      console.log(formdata)
      mutate(formdata)

    }
    
   
    
  return (
    <div className='flex-col  min-h-full min-w-full' >
      <p>here are the contents </p>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <select 
          {...register("status")}
        name="status" id="status">
          <option value="">Please select a status</option>
          <option value="paid">Paid</option>
          <option value="due">due</option>


        </select>
       <Input
                register={register}
                name={"amount"} id={"amount"} label={"Amount"} placeholder={"Enter the amount"} error={errors?.amount?.message} />
        <Input
                register={register}
                name={"paidDate"} id={"paidDate"} label={"Paid Date"} placeholder={"Enter the paid date"} error={errors?.paidDate?.message} />
      <Input
                register={register}
                name={"dueDate"} id={"dueDate"} label={"Due Date"} placeholder={"Enter the due date"} error={errors?.dueDate?.message} />



 <button
                    type='submit'
                    disabled={isPending}
                    className="min-h-10 bg-green-900 min-w-full px-2 rounded-2xl border-2 border-black hover:border-2 text-white hover:border-amber-50"
                >
                    {isPending ? "Submitting..." : "Submit"}
                </button>
        

      </form>
        
       


    </div>
  )
}
