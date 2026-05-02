import type { InferType } from "yup";
import { feeschema } from "../schemas/fee.schema";
import { updateFesSchema } from "../schemas/fee.schema";
export interface IIfees {
    _id:string,
    student:{
         first_name:string,
        last_name:string
    }
    
    course:{
        _id:string,
       name:string
    },
    amount:number,
    semester:string,
    paidDate:Date,
    dueDate:Date,
    status:string,
    

}
export type updateFeeInput = InferType<typeof updateFesSchema>
export type feeInput =InferType < typeof feeschema>
