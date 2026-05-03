import { useQuery } from "@tanstack/react-query";
import { CourseFn } from "../../../api/course.api";
import { DataLoading } from "../../../components/common/DataLoading";
import { SectionHeading } from "../../../components/common/section.heading";
import CourseList from "./list";

export const Course = () => {

  const { data, isLoading } = useQuery({
    queryFn: CourseFn,
    queryKey: ["courses"]
  });
  console.log(data?.data)

  return (
    <div className="text-black">

      <SectionHeading
        title="Explore our courses"
        subtitle="Here are all of our courses"
        link="#"
      />

      {isLoading && <DataLoading />}

      {!isLoading && data?.data?.length > 0 && (
        <CourseList courses={data.data} />
      )}

    </div>
  );
};