import { useQuery } from "@tanstack/react-query"
import { studentbca } from "../../../../../api/student.api"
import { SectionHeading } from "../../../../../components/common/section.heading"
import { DataLoading } from "../../../../../components/common/DataLoading"
import { StudentList } from "../student.lists"
import { Datanotfound } from "../../../../../components/common/datanotfound"

import { useState } from "react"

export const Studentbca = () => {

  const [semester, setSemester] = useState("")

  const { data, isLoading, isError } = useQuery({
    queryFn: ()=> studentbca(semester),
    queryKey: ["students-bca", semester],
    enabled: !!semester   // ✅ only fetch when semester is selected
  })

  return (
    <div className="p-4">

      {/* Add Student Button */}
      

      {/* Heading */}
      <SectionHeading
        title="List of students"
        subtitle="The list of students from BCA"
        link="#"
      />

      {/* Semester Filter */}
      <div className="my-4">
        <label className="mr-2 font-semibold">Semester:</label>

        <select
          value={semester}
          onChange={(e) =>{ 
            console.log(e.target.value)
            setSemester(e.target.value)}}
          disabled={isLoading}
          className='h-10 px-3 rounded-xl border-2 shadow-md'
        >
          <option value="">Select a semester</option>
          <option value="1st semester">1st semester</option>
          <option value="2nd semester">2nd semester</option>
          <option value="3rd semester">3rd semester</option>
          <option value="4th semester">4th semester</option>
          <option value="5th semester">5th semester</option>
          <option value="6th semester">6th semester</option>
          <option value="7th semester">7th semester</option>
          <option value="8th semester">8th semester</option>
        </select>
      </div>

      {/* Before Selection */}
      {!semester && (
        <p className="text-gray-400">Please select a semester</p>
      )}

      {/* Loading */}
      {isLoading && <DataLoading />}

      {/* Error */}
      {isError && (
        <p className="text-red-500">Failed to load students ❌</p>
      )}

      {/* Data */}
      {!isLoading && data?.data?.length > 0 && (
        <StudentList students={data.data} />
      )}

      {/* No Data */}
      {!isLoading && semester && data?.data?.length === 0 && (
        <Datanotfound />
      )}

    </div>
  )
}