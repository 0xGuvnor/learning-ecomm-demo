import getProgress from "@/actions/get-progress";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import CourseSidebar from "./_components/course-sidebar";
import CourseNavbar from "./_components/course-navbar";

interface Props {
  children: ReactNode;
  params: { courseId: string };
}

const CourseIdLayout = async ({ children, params: { courseId } }: Props) => {
  const { userId } = auth();
  if (!userId) redirect("/");

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: { userId },
          },
        },
        orderBy: { position: "asc" },
      },
    },
  });
  if (!course) redirect("/");

  const progressCount = await getProgress(userId, course.id);

  return (
    <div className="h-full">
      <div className={cn("fixed inset-y-0 z-50 h-[80px] w-full", "md:pl-80")}>
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>

      <div
        className={cn(
          "fixed inset-y-0 z-50 hidden h-full w-80 flex-col",
          "md:flex",
        )}
      >
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>

      <main className={cn("h-full pt-[80px]", "md:pl-80")}>{children}</main>
    </div>
  );
};
export default CourseIdLayout;
