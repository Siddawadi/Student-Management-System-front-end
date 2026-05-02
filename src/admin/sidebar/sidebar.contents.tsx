import { MdDashboard } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { FaBookReader } from "react-icons/fa";
import { FaRegMoneyBillAlt } from "react-icons/fa";


import { Link } from "react-router"
import { useLocation } from "react-router";
 const sidebarcontents=[
    {

    label:"Dashboard",
    link:"/admin/dashboard",
    icon:MdDashboard
    },
    {
    label:"Students",
    link:"/admin/students",
    icon:CiUser
    },
{
    label:"Courses",
    link:"/admin/courses",
    icon:FaBookReader
    },
{
    label:"Fee",
    link:"/admin/fee",
    icon:FaRegMoneyBillAlt
    },{
    label:"Attendance",
    link:"/admin/attendance",
    icon:SlCalender
    ,
    

    }]
    

     const Sidebarcontents=()=>{
        return(
            
            <div className="bg-olive-200 text-black border-x-2  min-h-screen py-2 jusitfy-center">
                <div className=" justify-center items-center flex">
                    <p className="items-center">Overview</p>
                </div>
                {
                
               sidebarcontents.map((items)=><Item key={items.label}  link={items.link} label={items.label} icon={items.icon} />)
            }

            </div>
        )
    }

   const Item = ({ link, label, icon: Icon }: { link: string; label: string; icon: React.ElementType }) => {
  const { pathname } = useLocation();
  const isActive = pathname === link;

  return (
    <div className={`hover:bg-gray-100 rounded-2xl border-gray-500 p-2 flex items-center ${isActive ? "bg-green-900  max-w-full px-3 text-white rounded-md p-2" : ""}`}>
      <Link className="flex items-center gap-1" to={link}>
      <p></p>  {label}
        <Icon />
      </Link>
    </div>
  );
};
    export default Sidebarcontents