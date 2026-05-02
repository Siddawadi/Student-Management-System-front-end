import { useQuery } from "@tanstack/react-query"
import { getDashboardStats } from "../../../api/dashboard.api"
import Card from "./dashboard.card"

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats
  })

  if (isLoading) return <p className="p-6">Loading...</p>

  if (error) return <p className="p-6 text-red-500">Error loading dashboard</p>

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <Card title="Students" value={data.totalStudents} />
        <Card title="Courses" value={data.totalCourses} />
        <Card title="Attendance %" value={data.attendancePercentage + "%"} />
        <Card title="Revenue" value={"Rs. " + data.totalRevenue} />

      </div>

    </div>
  )
}

export default Dashboard