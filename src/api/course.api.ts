import instance from ".";


import type { CourseInput, updatecourseINput } from "../types/course.types";

export const CourseFn =async () => {

    try{
        const response = await instance.get("/course/getall")

 return (
   response.data
  )

    }catch(error){
        throw error 
    }
 
}

export const Addcoursefn =async (formdata:CourseInput) => {

    try{
        const response = await instance.post("/course/add",formdata)

 return (
   response.data,
   console.log("this is the response from db",response.data)
  )

    }catch(error){
        throw error 
    }
 
}
export const Deletecoursefn = async (id:string)=>{
    try{
        const response = await instance.delete(`course/delete/${id}`)
        return(
            response.data
        )

    }catch(error){
        throw  error 
    }

}
export const updateCourse = async (id:string,data:updatecourseINput)=>{
      try{
        const response = await instance.put(`course/updatecourse/${id}`,data)
        return(
            response.data
        )

    }catch(error){
        throw  error 
    }

}