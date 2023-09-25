"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePublish = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        const res = await fetch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`,
          { method: "PATCH" },
        );
        if (!res.ok) throw new Error("Failed to unpublish");

        toast.success("Chapter unpublished");
      } else {
        const res = await fetch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`,
          { method: "PATCH" },
        );
        if (!res.ok) throw new Error("Failed to publish");

        toast.success("Chapter published");
      }

      router.refresh();
    } catch {
      toast.error("Seomething went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error("Delete failed");

      toast.success("Chapter deleted");
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center gap-x-2">
      <Button
        onClick={handlePublish}
        disabled={disabled || isLoading}
        variant={"outline"}
        size={"sm"}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <ConfirmModal handleConfirm={handleDelete}>
        <Button size={"sm"} variant={"destructive"} disabled={isLoading}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </section>
  );
};
export default ChapterActions;
