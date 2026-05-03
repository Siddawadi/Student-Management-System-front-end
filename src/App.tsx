
import { BrowserRouter as Router,Routes,Route} from 'react-router'
import './App.css'
import { Landingpage } from './pages/landing.page'
import { LoginPage } from './pages/auth/login.page'
import { Registerpage } from './pages/auth/register.page'
import { Aboutus } from './pages/aboutus'
import { Clientlayout } from './client/client.layout'
import { StudentCourseSection } from './admin/pages/students/student courses'

import { Courses } from './admin/pages/courses/courses'
import { Attendancepage } from './admin/pages/attendance/attendance.page'
import { Adminlayout } from './admin/layouts/admin.layout'
import { Addcourses } from './admin/pages/courses/add.courses'
import { Addstudent } from './admin/pages/students/add.student'
import { Studentbca } from './admin/pages/students/student courses/bca'
import { Studentcsit } from './admin/pages/students/student courses/csit'
import { Studentbhm } from './admin/pages/students/student courses/bhm'
import { Studentbbm } from './admin/pages/students/student courses/bbm'
import {  Fees } from './admin/pages/fee/fee'
import { Studentlaw } from './admin/pages/students/student courses/law'
import { Addfee } from './admin/forms/add.fee'
import { Findattendance } from './admin/pages/attendance/Find.attendance'
import Dashboard from './admin/pages/dashboard/dashboard'
function App() {
  

  return (
    <div className='text-black '>
    <Router>
      <Routes>

        <Route path="/register" element=  {<Registerpage/>}/>
  
    <Route path='/' element={<LoginPage/>}>
    

      <Route path='aboutus' element={<Aboutus/>}/>
        <Route path='/' element={<Landingpage/>}/>
        </Route>
    <Route path="/admin" element={<Adminlayout/>}>

    <Route path='dashboard' element={<Dashboard/>}/>
    <Route path='students' element={<StudentCourseSection/>}/>
    <Route path='attendance' element={<Attendancepage/>}/>
    <Route path='courses' element={<Courses/>}/>
    <Route path='addcourses' element={<Addcourses/>}/>
    <Route path="addStudents" element={<Addstudent/>}/>
    <Route path="student/bca" element={<Studentbca/>}/>
    <Route path="student/csit" element={<Studentcsit/>}/>
    <Route path="student/bhm" element={<Studentbhm/>}/>
    <Route path="student/bbm" element={<Studentbbm/>}/>
    <Route path="findattendance" element={<Findattendance/>}/>
    <Route path='addfees' element={<Addfee/>}/>
    <Route path="student/law" element={<Studentlaw/>}/>
     <Route path="fee" element={<Fees/>}/>


  
</Route>
   
    <Route path='*' element={<p>Could't find page</p>}/>

    
</Routes>
    </Router>
  </div>
    
  )
}

export default App
