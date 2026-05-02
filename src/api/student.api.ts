import instance from "."
import type { StudentInput } from "../types/student.types"
export const studentfn= async ()=>{
    try{const response = await instance.get("/student/findall")
        if(!response.data){
            console.log("no data is gained")
        }
        return(
         
            response.data
        )

    }catch(error:any){
        
        
        throw  error
    }
    
}
// student.api.ts
export const StudentINputFN = async (data: StudentInput) => {

  const response = await instance.post('/student/addStudent', data, {
    headers: { 'Content-Type': 'application/json' },
  })
  return response.data
}


export const studentbca = async (semester: string) => {
  try {
    const response = await instance.post("/student/findbcabysem", {
      semester,
      course: "69eb23edfce2554dea6b4d78"
    })

    return response.data

  } catch (error: any) {
    throw error
  }
}
export const studetntcsit = async (semester: string) => {
  try {
    const response = await instance.post("/student/findcsitbysem", {
      semester,
      course: "69eb2506fce2554dea6b4d80"
    })

    return response.data

  } catch (error: any) {
    throw error
  }
}

export const studetntbhm = async (semester: string) => {
  try {
    const response = await instance.post("/student/findbhmbysem", {
      semester,
      course: "69eb2533fce2554dea6b4d85"
    })

    return response.data

  } catch (error: any) {
    throw error
  }
}


export const studentbbm = async (semester: string) => {
  try {
    const response = await instance.post("/student/findbbmbysem", {
      semester,
      course: "69eb2406fce2554dea6b4d7a"
    })

    return response.data

  } catch (error: any) {
    throw error
  }
}
export const studentlaw = async (semester: string) => {
  try {
    const response = await instance.post("/student/findclawbysem", {
      semester,
      course: "69eb303aae839f685448e8ba"
    })

    return response.data

  } catch (error: any) {
    throw error
  }
}

export const studentdelete= async (id:string)=>{

  try{
    const response = await instance.delete(`/student/deletestudent/${id}`)
      return(
        response.data
      
    )
  }
  catch(error){
    throw error
  }
}
export const findbySemesterandCourse = async (semester: string, course: string) => {
    try {
        const response = await instance.get(`/student/findbySemesterandCourse`,{
          params:{
           semester,
                course}
           
            }
              
            
        )
        console.log(response.data)
        return response.data
    } catch (error) {
        throw error
    }
}
export const studentupdate = async ({ id, data }: { id: string; data: FormData }) => {
  const response = await instance.patch(`/student/updatestudent/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}