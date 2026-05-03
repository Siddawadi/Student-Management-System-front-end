import { useForm, type SubmitHandler } from "react-hook-form"
import { Input } from "../components/common/inputs/input"
import { Link } from "react-router"
import { yupResolver } from "@hookform/resolvers/yup"
import { Registerschema } from "../schemas/auth.schema"
import type { RegisterInput } from "../types/login.types"
import { useMutation } from "@tanstack/react-query"
import { Rregister } from "../api/auth.api"

export const  Registerform = () => {

        const {register,handleSubmit,formState:{errors}}=useForm({
          defaultValues:{
          first_name:"",
          last_name:"",
            email:"",
            password:"",
            c_password:"",
            phone:""
          },
          resolver:yupResolver(Registerschema)
 })

 const {mutate ,isPending}= useMutation({
  mutationFn:Rregister,
  onSuccess:(response)=>{
    console.log(response)
    console.log( "register successfull")

  },
  onError:(error)=>{
    console.log(error)

  }
 })

 const onSubmit:SubmitHandler<RegisterInput>=(data:({first_name:string,last_name:string,email:string,password:string,c_password:string,phone:string}))=>{
  console.log("successfully registered  ",data)
  mutate(data)
 }
  return (
    <div className=' flex flex-col  justify-center items-center  '>

        <p className="font-semibold text-2xl">Register page</p>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-fit ">
    <Input register={register} type={"text"} label={"First Name" } placeholder={"enter your name here "}
     name={"first_name"} id={"first_name"} error={errors?.first_name?.message}  />
     <Input register={register} type={"text"} label={"Last Name" } placeholder={"enter your name here "} 
     name={"last_name"} id={" Email"} error={errors?.last_name?.message} />
    
     </div> 
     <div className="flex-col flex min-w-fit">
     <Input register={register} type={"text"} label={"Email" } placeholder={"enter your Email here "}
      name={"email"} id={"Last Name"} error={errors?.email?.message}  />
       
         <Input register={register} type={"password"} label={"password" } placeholder={"enter your password here "} name={"password"} id={"password"} error={errors?.password?.message}  />
           <Input register={register} type={"password"} label={"Confirm Password" } placeholder={"Retype your password here "} name={"c_password"} id={"c_password"} error={errors?.c_password?.message}/>
                <Input register={register} type={"number"} label={"phone" } placeholder={"enter your Phone number here "} name={"phone"} id={"phone"} error={errors?.phone?.message} />
      <div className='min-h-10 min-w-full p-5'>
        
        <button disabled={isPending} className="min-h-10 bg-green-900 min-w-full text-white rounded-2xl hover:border-2 hover:border-amber-50 ">Register</button>
    
    <span> <Link to="/" className="text-xs flex justify-center items-center hover:underline">Already has an account?</Link></span>
</div>
</div>
</form>
    </div>
  )
}
