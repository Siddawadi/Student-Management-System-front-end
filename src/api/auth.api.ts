
import instance from ".";
import type { LoginInput, RegisterInput } from "../types/login.types";

// axios is promise based httpclient we thats why we use async 
export const login = async (data:LoginInput)=>{
    try{
        // sending post request from 
        const response= await instance.post("/user/login",data)
        console.log(response)
        return response.data
    }catch(error:any){
        throw error
    }
}
export const Rregister = async (data:RegisterInput)=>{
    try{
        const response = await instance.post("/user/register",data)
        console.log("the response is ",response.data)
        return(
            response.data

         

        )

    }catch(error){
        throw error
    }
    }

export const getProfile = async () => {
  try {
    const response = await instance.get("/user/profile");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const logoutFn = async () => {
  const response = await instance.post("/user/logout")
  return response.data
}