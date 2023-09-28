import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const PUT = async (
  req: Request,
  {
    params: { courseId, chapterId },
  }: { params: { courseId: string; chapterId: string } },
) => {
  try {
    const { userId } = auth();
    const { isCompleted } = await req.json();

    if (!userId) return new NextResponse("Unauthorised", { status: 401 });

    const userProgress = await db.userProgress.upsert({
      where: { userId_chapterId: { userId, chapterId } },
      update: { isCompleted },
      create: { userId, chapterId, isCompleted },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.error("[PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
