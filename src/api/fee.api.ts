import instance from ".";
import type { feeInput, updateFeeInput } from "../types/fee.types";

export const Addfeeapi = async (data:feeInput) => {
    try{
    const response = await instance.post ("/fee/add", data
    )
    return response.data
    console.log(response.data)


}
    
    catch(error){
        throw error
    }
}


export const getfeebysemandcourse = async (semester: string, course: string) => {
    try{
    const response = await instance.post ("/fee/getfeebysemandcourse", 
         { semester, course }
    )
    return response.data
    console.log(response.data)


}
    
    catch(error){
        throw error
    }
}

export const delbyid = async (id:string) => {
    console.log(id)
    try{
    const response = await instance.delete (`fee/deletebyid/${id}`
         
    )
    return response.data
    console.log(response.data)


}
    
    catch(error){
        throw error
    }
}


export const updatebyid = async (id:string,data:updateFeeInput) => {
    console.log(id)
    try{
    const response = await instance.patch(`fee/updatebyid/${id}`,
        data
         
    )
     console.log("response",response.data)
    return response.data
   


}
    
    catch(error){
        throw error
    }
}