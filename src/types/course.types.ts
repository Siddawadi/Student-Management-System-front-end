import type { InferType } from "yup";
import {CourseSchema, updatecourseSchema} from "../schemas/add.courses.schema";
export interface IProps{
    _id:string,
    name:string,
    code:string,
    Coordinator:string,
    schedule:string,
    duration:string,

}
 export type CourseInput =InferType <typeof CourseSchema>
export type updatecourseINput = InferType<typeof updatecourseSchema>