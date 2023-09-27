import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const { Video } = new Mux();

export const PATCH = async (
  req: Request,
  { params: { courseId } }: { params: { courseId: string } },
) => {
  try {
    const { userId } = auth();
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorised access", { status: 401 });
    }

    const course = await db.course.update({
      where: { id: courseId, userId },
      data: { ...values },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const DELETE = async (
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

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await Video.Assets.del(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: { id: courseId },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.error("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
