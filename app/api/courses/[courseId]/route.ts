import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

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
