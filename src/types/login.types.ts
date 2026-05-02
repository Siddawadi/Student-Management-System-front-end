import { LoginSchema, Registerschema } from "../schemas/auth.schema"
import type { InferType } from "yup"
import type { IImageprops, USER_ROLES } from "./global.types"  // ✅ USER_ROLE not USER_ROLES

export type RegisterInput = InferType<typeof Registerschema>
export type LoginInput = InferType<typeof LoginSchema>

export interface IUser {
    _id: string
    first_name: string
    last_name: string
    email: string
    password: string
    profile_image: IImageprops
    role: USER_ROLES // ✅ just USER_ROLE, not USER_ROLE.USER
}