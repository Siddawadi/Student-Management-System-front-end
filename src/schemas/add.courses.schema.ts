import *  as yup from "yup"
export const CourseSchema = yup.object({
    name:yup.string().required("name is required").min(6),
    code:yup.string().required().max(10),
    Coordinator:yup.string().required("Cordinator name is required").min(6),
    schedule:yup.string().required("schedule is required").min(6),
    duration:yup.string().required("duration is required").min(6),
})
export const updatecourseSchema = yup.object({
    name:yup.string(),
    code:yup.string(),
    Coordinator:yup.string(),
    schedule:yup.string(),
    duration:yup.string(),
})


