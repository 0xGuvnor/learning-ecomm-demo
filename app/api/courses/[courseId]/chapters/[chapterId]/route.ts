import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { Video } = new Mux();

export const PATCH = async (
  req: Request,
  {
    params: { courseId, chapterId },
  }: { params: { courseId: string; chapterId: string } },
) => {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) return new NextResponse("Unauthorised", { status: 401 });

    const courseOwner = await db.course.findUnique({
      where: { id: courseId, userId },
    });

    if (!courseOwner) return new NextResponse("Unauthorised", { status: 401 });

    const chapter = await db.chapter.update({
      where: { id: chapterId, courseId },
      data: { ...values },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: { chapterId },
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({ where: { id: existingMuxData.id } });
      }

      const asset = await Video.Assets.create({
        input: values.videoUrl,
        playback_policy: "public",
        test: false,
      });

      await db.muxData.create({
        data: {
          chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("[CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const DELETE = async (
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

    if (!chapter) return new NextResponse("Not Found", { status: 404 });

    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: { chapterId },
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({ where: { id: existingMuxData.id } });
      }

      const deletedChapter = await db.chapter.delete({
        where: { id: chapterId },
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

      return NextResponse.json(deletedChapter);
    }
  } catch (error) {
    console.error("[CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
