import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params: { courseId } }: { params: { courseId: string } },
) => {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: { userId, id: courseId },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const lastChapter = await db.chapter.findFirst({
      where: { courseId },
      orderBy: { position: "desc" },
    });

    const position = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await db.chapter.create({
      data: {
        title,
        courseId,
        position,
      },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("[CHAPTERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
