import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  {
    params: { courseId, chapterId },
  }: { params: { courseId: string; chapterId: string } },
) => {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorised", { status: 401 });

    const courseOwner = await db.course.findUnique({
      where: { id: courseId, userId },
    });

    if (!courseOwner) return new NextResponse("Unauthorised", { status: 401 });

    const unpublishedChapter = await db.chapter.update({
      where: { id: chapterId, courseId },
      data: { isPublished: false },
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: { courseId, isPublished: true },
    });

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: { id: courseId },
        data: { isPublished: false },
      });
    }

    return NextResponse.json(unpublishedChapter);
  } catch (error) {
    console.error("[UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
