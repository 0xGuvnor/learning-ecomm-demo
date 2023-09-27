import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params: { courseId } }: { params: { courseId: string } },
) => {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorised", { status: 401 });

    const course = await db.course.findUnique({
      where: { id: courseId, userId },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) return new NextResponse("Not Found", { status: 404 });

    const hasPublishedChapters = course.chapters.some(
      (chapter) => chapter.isPublished,
    );

    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.categoryId ||
      !hasPublishedChapters
    ) {
      return new NextResponse("Missing Required Fields", { status: 401 });
    }

    const publishedCourse = await db.course.update({
      where: { id: courseId, userId },
      data: { isPublished: true },
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.error("[PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
