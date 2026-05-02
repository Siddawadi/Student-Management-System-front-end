// attedance.types.ts
export interface IAttendance {
    _id: string
    first_name: string
    last_name: string
    phone: string
    semester: string     
    status: string
    course: {
        _id: string
        name: string
    }
}