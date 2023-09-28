"use client";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId?: string;
  playbackId: string;
  isLocked: boolean;
  completeOnEnd: boolean;
}

const VideoPlayer = ({
  chapterId,
  title,
  courseId,
  nextChapterId,
  playbackId,
  isLocked,
  completeOnEnd,
}: Props) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const handleEnded = async () => {
    try {
      if (completeOnEnd) {
        const res = await fetch(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            method: "PUT",
            body: JSON.stringify({ isCompleted: true }),
          },
        );
        if (!res.ok) throw new Error("Update failed");

        if (!nextChapterId) confetti.onOpen();

        toast.success("Progress updated");
        router.refresh();

        if (nextChapterId)
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}

      {!isLocked && (
        <MuxPlayer
          title={title}
          playbackId={playbackId}
          onCanPlay={() => setIsReady(true)}
          onEnded={handleEnded}
          className={cn(!isReady && "hidden")}
        />
      )}

      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-slate-950 text-secondary">
          <Lock className="h-8 w-8 " />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
    </section>
  );
};
export default VideoPlayer;
