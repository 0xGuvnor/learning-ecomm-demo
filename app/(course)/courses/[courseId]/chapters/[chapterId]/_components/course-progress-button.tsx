"use client";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
}

const CourseProgressButton = ({
  chapterId,
  courseId,
  nextChapterId,
  isCompleted,
}: Props) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          method: "PUT",
          body: JSON.stringify({ isCompleted: !isCompleted }),
        },
      );
      if (!res.ok) throw new Error("Update failed");

      if (!isCompleted && !nextChapterId) confetti.onOpen();

      if (!isCompleted && nextChapterId)
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);

      toast.success("Progress updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? XCircle : CheckCircle;

  return (
    <Button
      type="button"
      variant={isCompleted ? "outline" : "success"}
      disabled={isLoading}
      onClick={handleClick}
      className={cn("w-full gap-x-2", "md:w-auto")}
    >
      {isCompleted ? "Not completed" : "Mark as complete"}
      <Icon className="h-4 w-4" />
    </Button>
  );
};
export default CourseProgressButton;
