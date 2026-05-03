import { Link } from "react-router"
import { GrUserManager } from "react-icons/gr"
import type { IProps } from "../../../../types/course.types"
import { GiDuration } from "react-icons/gi";
import { RiCalendarScheduleFill } from "react-icons/ri";
interface Icourse {
  courses: IProps[]  // ✅ array, not a single object
}

interface CourseItem {
  label: string,
  link: string,
  coordinator: string,
  code: string,
  duration:string,
  schedule:string
}

const Items = ({ label, link, coordinator,schedule, code ,duration}: CourseItem) => {
  return (
    <div className="bg-gray-200 border-2 rounded-2xl  min-h-fit shadow-2xl   border-gray-300 p-5">
      <Link className="text-gray-700 flex flex-col gap-2 items-center justify-center" to={link}>
      
        <p className="text-green-900 bg-gray-300 max-w-15 items-center flex px-2 rounded-2xl">
          {code}
        </p>
        <p className="text-2xl shadow-2xs  p-2  ">{label}</p>
        <p className="p flex gap-1 justify-center items-center bg-olive-50 rounded-3xl ">
          <GrUserManager /> Coordinator: {coordinator}
        </p>
        <p className="flex items-center gap-2"><GiDuration/>{duration}</p>
        <p className="flex items-center gap-2"><RiCalendarScheduleFill/>{schedule}</p>
      </Link>
    </div>
  )
}

const ManageCourse = ({ courses }: Icourse) => {
  console.log("this is the content of", courses)  
    console.log(courses)
    
  const courseContent: CourseItem[] = [
    {
      label: courses[0]?.name,        
      link: "/admin/student/bca",
      coordinator: courses[0]?.Coordinator,
      code: courses[0]?.code,
      duration:courses[0]?.duration,
      schedule:courses[0]?.schedule,
    },
    {
      label: courses[1].name,
      link: "/admin/student/bbm",
      coordinator: courses[1]?.Coordinator,
      code: courses[1]?.code,
      duration:courses[1]?.duration,
      schedule:courses[1]?.schedule,
    },
    {
      label: courses[2].name,
      link: "/admin/student/csit",
      coordinator: courses[2]?.Coordinator,
      code: courses[2]?.code,
      duration:courses[2]?.duration,
      schedule:courses[2]?.schedule,
    },
    {
      label:  courses[3]?.name,
      link: "/admin/student/bhm",
      coordinator: courses[3]?.Coordinator,
      code: courses[3].code,
      duration:courses[3]?.duration,
      schedule:courses[3]?.schedule,
    },
    { 
      label:  courses[4]?.name,
      link: "/admin/student/law",
      coordinator: courses[4]?.Coordinator,
      code: courses[4]?.code,
      duration:courses[4]?.duration,
      schedule:courses[4]?.schedule,
    },
  ]

  return (
    <div className="text-white grid grid-cols-3 shadow-2xl border-2 gap-2 py-5 px-5 min-h-screen">
      {courseContent.map((item) => (
        <Items
          key={item.link}
          link={item.link}
          label={item.label}
          coordinator={item.coordinator}
          code={item.code}
          duration={item.duration}
          schedule={item.schedule}
        />
      ))}
    </div>
  )
}

export default ManageCourse