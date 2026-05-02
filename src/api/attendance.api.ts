
import instance from "."

export const getAttendanceBySemandCourse = async (semester: string, course: string) => {
    try{
    const response = await instance.post ("/attendance/getfeebysemandcourse", 
         { semester, course }
    )
    return response.data
    console.log(response.data)


}
    
    catch(error){
        throw error
    }
}
export const AddAttendance = async (data: {
    student: string,   
    course: string,
    date: Date,
    status: string,
    semester:string
}) => {
    try {
        const response = await instance.post("/attendance/add", data)
        return response.data
    } catch (error) {
        throw error
    }
}


// 1. Course, Semester, Date अनुसार attendance खोज्न
export const FindAttendance = async (course: string, semester: string, date: Date) => {
    const response = await instance.get('/attendance/find', {  // ← /getbydate → /find
        params: { course, semester, date }
    })
    return response.data
}

export const FindAllAttendance = async () => {
    const response = await instance.get('/attendance/all')
    return response.data
}
export const DeleteAttendance = async (id: string) => {
    try {
        console.log("deleting:", id)
        const response = await instance.delete(`/attendance/delete/${id}`)
        console.log("delete response:", response.data)
        return response.data
    } catch (error) {
        console.log("delete error:", error)
        throw error
    }
}

export const DeleteAllAttendance = async (course: string, semester: string, date: Date) => {
    try {
        console.log("delete all:", { course, semester, date })
        const response = await instance.delete('/attendance/deleteall', {
            params: { course, semester, date }
        })
        console.log("delete all response:", response.data)
        return response.data
    } catch (error) {
        console.log("delete all error:", error)
        throw error
    }
}