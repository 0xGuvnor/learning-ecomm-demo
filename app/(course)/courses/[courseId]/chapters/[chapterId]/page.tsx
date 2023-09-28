import getChapter from "@/actions/get-chapter";
import Banner from "@/components/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/video-player";
import { cn } from "@/lib/utils";
import CourseEnrollButton from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import Preview from "@/components/preview";
import { File } from "lucide-react";
import CourseProgressButton from "./_components/course-progress-button";

interface Props {
  params: { courseId: string; chapterId: string };
}

const ChapterIdPage = async ({ params: { courseId, chapterId } }: Props) => {
  const { userId } = auth();
  if (!userId) redirect("/");

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({ userId, chapterId, courseId });

  if (!chapter || !course) redirect("/");

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          label="You've already completed this chapter."
          variant={"success"}
        />
      )}
      {isLocked && (
        <Banner
          label="You need to purchase this course to watch this chapter."
          variant={"warning"}
        />
      )}

      <div className="mx-auto flex max-w-4xl flex-col pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={chapterId}
            title={chapter.title}
            courseId={courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>

        <div>
          <div
            className={cn(
              "flex flex-col items-center justify-between p-4",
              "md:flex-row",
            )}
          >
            <h2 className="mb-2 text-2xl font-semibold">{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={chapterId}
                courseId={courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton courseId={courseId} price={course.price!} />
            )}
          </div>

          <Separator />

          <div>
            <Preview value={chapter.description!} />
          </div>

          <div>
            {!!attachments.length && (
              <>
                <Separator />
                <div className="p-4">
                  {attachments.map((attachment) => (
                    <a
                      key={attachment.id}
                      href={attachment.url}
                      target="_blank"
                      className={cn(
                        "flex w-full items-center rounded-md border bg-sky-200 p-3 text-sky-700",
                        "hover:underline",
                      )}
                    >
                      <File />
                      <p className="line-clamp-1">{attachment.name}</p>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChapterIdPage;
