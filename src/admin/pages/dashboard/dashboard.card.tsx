interface DashboardCardProps {
  title: string
  value: string | number
}

const DashboardCard = ({ title, value }: DashboardCardProps) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow border hover:shadow-md transition">
      
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-2xl font-bold mt-2">
        {value}
      </p>

    </div>
  )
}

export default DashboardCard