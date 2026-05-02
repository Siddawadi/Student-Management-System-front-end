import type { IProps } from "../../../types/course.types";
import { Card } from "./card";

interface CourseListProps {
  courses: IProps[];
}

const CourseList = ({ courses }: CourseListProps) => {
  return (
    <div className="text-white grid grid-cols-3 shadow-2xl border-2 gap-3 gap-y-2.5 py-5 px-5  min-h-screen shadow-2xl">
      {courses.map((course) => (
        <Card key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;