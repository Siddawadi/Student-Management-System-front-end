import { useQuery } from "@tanstack/react-query"
import { getDashboardStats } from "../../../api/dashboard.api"
import DashboardCard from "./dashboard.card"

interface IDashboardStats {
  success: boolean
  data: {
    totalStudents: number
    totalCourses: number
    attendancePercentage: number
    totalRevenue: number
  }
}
const Dashboard = () => {
  const { data, isLoading, error } = useQuery<IDashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats
  })

  console.log(data)

  if (isLoading) return <p className="p-6">Loading...</p>
  if (error) return <p className="p-6 text-red-500">Error loading dashboard</p>

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
       <DashboardCard title="Students" value={data?.data?.totalStudents ?? 0} />
<DashboardCard title="Courses" value={data?.data?.totalCourses ?? 0} />
<DashboardCard title="Attendance %" value={(data?.data?.attendancePercentage ?? 0) + "%"} />
<DashboardCard title="Revenue" value={"Rs. " + (data?.data?.totalRevenue ?? 0)} />
      </div>
    </div>
  )
}

export default Dashboard