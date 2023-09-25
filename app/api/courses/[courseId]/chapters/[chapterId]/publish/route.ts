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

    const chapter = await db.chapter.findUnique({
      where: { id: chapterId, courseId },
    });

    const muxData = await db.muxData.findUnique({
      where: {
        chapterId,
      },
    });

    if (
      !chapter ||
      !muxData ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    )
      return new NextResponse("Missing Required Fields", { status: 400 });

    const publishedChapter = await db.chapter.update({
      where: { id: chapterId, courseId },
      data: { isPublished: true },
    });

    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.error("[PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
