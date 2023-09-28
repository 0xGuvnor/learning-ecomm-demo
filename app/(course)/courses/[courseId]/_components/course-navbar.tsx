import NavbarRoutes from "@/components/navbar-routes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import CourseMobileSidebar from "./course-mobile-sidebar";

interface Props {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseNavbar = ({ course, progressCount }: Props) => {
  return (
    <nav className="flex h-full items-center border-b p-4 shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </nav>
  );
};
export default CourseNavbar;
