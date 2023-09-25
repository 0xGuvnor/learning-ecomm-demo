"use client";

import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Chapter, MuxData } from "@prisma/client";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";
import MuxPlayer from "@mux/mux-player-react";

interface Props {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const ChapterVideoForm = ({ initialData, courseId, chapterId }: Props) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        {
          method: "PATCH",
          body: JSON.stringify(values),
        },
      );
      if (!res.ok) throw new Error("Update failed");

      toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const toggleEdit = () => setIsEditing((prev) => !prev);

  return (
    <section
      className={cn(
        "space-y-2 rounded-md border border-none bg-card p-4 shadow-xl",
      )}
    >
      <div className="flex items-center justify-between font-medium">
        Chapter video
        <Button
          variant={"ghost"}
          onClick={toggleEdit}
          className={cn("flex gap-2")}
        >
          {isEditing ? (
            <>Cancel</>
          ) : !isEditing && !initialData.videoUrl ? (
            <>
              <PlusCircle className="h-4 w-4" />
              Add a video
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground">
            Upload this chapter&apos;s video
          </div>
        </>
      )}

      {!isEditing &&
        (initialData.videoUrl ? (
          <>
            <div className="relative aspect-video">
              <MuxPlayer playbackId={initialData.muxData?.playbackId || ""} />
            </div>

            <div className="text-xs text-muted-foreground">
              Videos can take a few minutes to process. Refresh the page if the
              video does not appear.
            </div>
          </>
        ) : (
          <div className="flex h-60 items-center justify-center rounded-md bg-card brightness-95">
            <Video className="h-10 w-10 text-card brightness-50" />
          </div>
        ))}
    </section>
  );
};
export default ChapterVideoForm;
