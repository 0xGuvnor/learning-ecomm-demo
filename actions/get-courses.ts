import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import getProgress from "./get-progress";

export type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface Props {
  userId: string;
  title?: string;
  categoryId?: string;
}

const getCourses = async ({
  userId,
  title,
  categoryId,
}: Props): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: { contains: title },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: { isPublished: true },
          select: { id: true },
        },
        purchases: {
          where: { userId },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            return { ...course, progress: null };
          }

          const progressPercentage = await getProgress(userId, course.id);

          return { ...course, progress: progressPercentage };
        }),
      );

    return coursesWithProgress;
  } catch (error) {
    console.error("[GET_COURSES]", error);
    return [];
  }
};
export default getCourses;
