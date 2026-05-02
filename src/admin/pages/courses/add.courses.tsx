import type{ CourseInput } from '../../../types/course.types'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../../../components/common/inputs/input'
import { useForm, type SubmitHandler } from 'react-hook-form'

import {CourseSchema} from '../../../schemas/add.courses.schema'
import { useMutation } from '@tanstack/react-query'
import { Addcoursefn } from '../../../api/course.api'

export const Addcourses = () => {
 

  const {register,handleSubmit,formState:{errors}}=useForm({
    defaultValues:{
      name:"",
      code:"",
      Coordinator :"",
      schedule:"",
      duration:"",


    },
    resolver:yupResolver(CourseSchema)
    
  })

  const {isPending,isSuccess,reset,mutate}=useMutation({
    mutationFn:Addcoursefn,
    onSuccess:(response)=>{
      console.log("response is",response)
     reset() // resets after form is successfully submitted
    
    
      

    },
    onError:(error)=>{
      console.log(error)

    }

  })
  const onSubmit:SubmitHandler<CourseInput> = (formData:{name:string,code:string,Coordinator:string,schedule:string,duration:string})=>{
   
    
    
   

    mutate(formData)
    
  }
  
  return (
     <main className='min-h-screen h-screen bg-black flex flex-col justify-center items-center' >
    
            <div className='border-blue-300 border min-h-110   min-w-80 bg-black shadow-2xl
             shadow-blue-950 rounded-2xl flex flex-col justify-start items-center gap-2
              text-gray-400'>
      <p className='text-white'> Add Courses</p>
      <form onSubmit={handleSubmit(onSubmit) } className='w-80 items-center'>
        {
          (isSuccess&& (
            <p>Form added Successfully</p>
          ))

        }
    <Input register={register} name={"name"} label={'Name'} id={'name'} 
    placeholder={'enter course name '} error={errors?.name?.message}/>

    <Input register={register} name={"code"} label={'Code'} id={'code'} 
    placeholder={'enter course code  '} error={errors?.code?.message} />


    <Input register={register} name={"Coordinator"} label={'Coordinator'} id={'Coordinator'} 
    placeholder={'enter course Coordinator '} error={errors?.Coordinator?.message} />

    <Input register={register} name={"schedule"} label={'Schedule'} id={'schedule'} 
    placeholder={'enter course name '} error={errors?.schedule?.message} />

  
    <Input register={register} name={"duration"} label={'duration'} id={'duration'} 
    placeholder={'enter course duration '} />

<div className='min-h-10 min-w-full py-10'>
        
        
        <button disabled={isPending} type='submit'   className="min-h-10 text-amber-50 bg-blue-400 min-w-full rounded-2xl hover:border-2 
        hover:border-amber-50 ">Submit</button>

      </div>

      </form>
      
        
    </div>
    </main>
  )
}
