import { useState } from "react"
import type { UseFormRegister } from "react-hook-form"
type Iprops={
name:string,
id:string,
type?:"text" | "password" | "number" | "Date"
placeholder:string,
error?:string,
label:string,
register:UseFormRegister<any>

}

export const Input:React.FC<Iprops> = ({name,label,type,placeholder,error,id,register}) => {
  const [show,setShow]=useState(false)
  return (
    
    <div className="max-h-fit -w-full  flex flex-col  justify-center items-center gap-0 p-1 ">
      <div className="min-w-full flex flex-col items-center px-3 ">
    <label htmlFor={id}> {label}</label>
    <input {...register(name)} // yesle object return garxa ani field ko name magxa 
    type={type!=="password"?type :type==="password" &&!show ?"password":"text"}
     placeholder={placeholder} 
     name={name}
      className="flex text-gray-800 min-w-full  hover:border rounded-xl  justify-center h-9 px-5 shadow shadow-cyan-950" /> 
  <p className="text-red-500">{error}</p>
  </div>
<div className="  flex min-w-full justify-end ">
  {type==="password"&&<label className="flex p-1 justify-center "> 
      {/*we have used label le wrap garesi jata click garda ni show password garxa  */}
  
    <input onChange={e=>{
      console.log(e.target.value)
      setShow(e.target.checked)
    console.log(e.target.checked)
    }} type="checkbox"   />
    <p className="text-xs"> show password</p>
    
  </label>}


</div>
      
    </div>
  )
}
