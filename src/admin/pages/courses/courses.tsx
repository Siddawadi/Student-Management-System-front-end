
import { Course } from '.'
import { Link } from 'react-router'
export const Courses = () => {
  return (
    <div className='flex flex-col py-2 justify-end'>

    <Link to="/admin/addcourses" className='border w-fit px-4 py-2 text-white bg-green-700 rounded-lg'> Add course+</Link>
    <Course/>
    </div>
  )
}
