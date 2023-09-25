"use client";

import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Attachment, Course } from "@prisma/client";
import { File, Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";

interface Props {
  initialData: Course & { attachments: Attachment[] };
  courseId: string | null;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: Props) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(`/api/courses/${courseId}/attachments`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error("Upload failed");
      }

      toast.success("Attachments updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const res = await fetch(`/api/courses/${courseId}/attachments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete attachment");
      }

      toast.success("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
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
        Course attachment(s)
        <Button
          variant={"ghost"}
          onClick={toggleEdit}
          className={cn("flex gap-2")}
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
              Add a file
            </>
          )}
        </Button>
      </div>

      {isEditing && (
        <>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground">
            Add the necessary learning materials or assignments here.
          </div>
        </>
      )}

      {!isEditing && (
        <>
          {initialData.attachments.length === 0 ? (
            <p className="text-sm italic text-muted-foreground">
              No attachments yet
            </p>
          ) : (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="border-item-border bg-item text-item-text flex w-full items-center gap-x-2 rounded-md border p-3"
                >
                  <File className="h-4 w-4 shrink-0" />
                  <p className="line-clamp-1 text-xs">{attachment.name}</p>
                  <Button
                    variant={"ghost"}
                    disabled={deletingId === attachment.id}
                    onClick={() => handleDelete(attachment.id)}
                    className={cn(
                      "ml-auto h-auto p-2",
                      deletingId === attachment.id &&
                        "cursor-default bg-[#E3DAC9] hover:bg-[#E3DAC9] hover:text-[#6F4E37]",
                      deletingId !== attachment.id &&
                        "hover:bg-destructive hover:text-destructive-foreground",
                    )}
                  >
                    {deletingId === attachment.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};
export default AttachmentForm;
