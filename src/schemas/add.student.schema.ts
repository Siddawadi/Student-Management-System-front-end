import * as yup from "yup"

export const AddstudentSchema = yup.object({
    email:yup.string().email().required("email is required "),// type/arko type /required 
    
    first_name:yup.string().required("name is required").min(3,"at least 3 characters").max(100),
    last_name:yup.string().required("last name is required").min(3,"at least 3 characters").max(100,"max characters is 100"),
   course:yup.string().required("course name is required").min(3,"at least 3 characters").max(100,"max characters is 100"),
  semester:yup.string().required("course name is required").min(3,"at least 3 characters").max(100,"max characters is 100"),
    phone:yup.string().required("enter your phone number"),
    password:yup.string().required("enter your password").min(6)
})