import * as yup from "yup"


 export const feeschema=yup.object({
        student:yup.string().required(),
        course:yup.string().required(),
        semester:yup.string().required(),
        amount:yup.number().required("enter the numbers"),
        status:yup.string().required(),
        paidDate:yup.date(),
        dueDate:yup.date()

 })
 
 export const updateFesSchema=yup.object({
       
        
        status:yup.string(),
        paidDate:yup.date(),
        dueDate:yup.date(),
        amount:yup.number()

 })
