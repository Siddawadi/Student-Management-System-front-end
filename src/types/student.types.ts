import type { InferType } from "yup"
import type { IImageprops } from "./global.types"
import type { AddstudentSchema } from "../schemas/add.student.schema"

export type StudentInput =InferType<typeof AddstudentSchema>

export interface IStudent {
    _id:string,
    first_name:string,
    last_name:string,
    email:string,
    phone:string,
    profile_image:IImageprops,
    course:string,
    semester:string
}
