import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import CourseSidebarItem from "./course-sidebar-item";
import CourseProgress from "@/components/course-progress";

interface Props {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseSidebar = async ({ course, progressCount }: Props) => {
  const { userId } = auth();
  if (!userId) redirect("/");

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  return (
    <section className="flex h-full flex-col overflow-y-auto border-r shadow-sm">
      <div className="flex flex-col justify-center gap-y-5 border-b p-8">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div>
            <CourseProgress value={progressCount} variant="success" />
          </div>
        )}
      </div>

      <div className="flex w-full flex-col">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </section>
  );
};
export default CourseSidebar;
