import * as yup from "yup"
 
export const Registerschema = yup.object({
    email:yup.string().email().required("email is required "),// type/arko type /required 
    password:yup.string().required("password is required").min(6),
    first_name:yup.string().required("name is required").min(3,"at least 3 characters").max(100),
    last_name:yup.string().required("last name is required").min(3,"at least 3 characters").max(100,"max characters is 100"),
    c_password:yup.string().oneOf([yup.ref("password")]).required("retype password"),
    phone:yup.string().required("enter your phone number").min(0,"phone number can't be negative ")
})
 // infertype le chai yup ko validations lai type script
//  ko type banaidinxa 
// {email:string,
// password:string} yesto banaidinxa 
export const LoginSchema = yup.object({
    email:yup.string().email().required("email is required "),// type/arko type /required 
    password:yup.string().required("password is required").min(6)
})