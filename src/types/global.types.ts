export interface IImageprops {
    id: string
    public_id: string
    path: string
}

export const USER_ROLES = {
    USER: "USER",
    ADMIN: "ADMIN",
    SUPER_ADMIN: "SUPER_ADMIN"  // ✅ fixed typo: "SUPER aDMIN" → "SUPER_ADMIN"
} as const  // ✅ needed so TypeScript treats values as literals

export type USER_ROLES = typeof USER_ROLES[keyof typeof USER_ROLES] 