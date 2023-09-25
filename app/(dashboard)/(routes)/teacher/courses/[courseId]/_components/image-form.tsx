"use client";

import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";

interface Props {
  initialData: Course;
  courseId: string | null;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, { message: "Image is required" }),
});

const ImageForm = ({ initialData, courseId }: Props) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: "PATCH",
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error("Update failed");
      }

      toast.success("Image updated");
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
        Course image
        <Button
          variant={"ghost"}
          onClick={toggleEdit}
          className={cn("flex gap-2")}
        >
          {isEditing ? (
            <>Cancel</>
          ) : !isEditing && !initialData.imageUrl ? (
            <>
              <PlusCircle className="h-4 w-4" />
              Add an image
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4" />
              Edit image
            </>
          )}
        </Button>
      </div>

      {isEditing && (
        <>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground">
            16:9 aspect ratio reccommended
          </div>
        </>
      )}

      {!isEditing &&
        (initialData.imageUrl ? (
          <div className="relative aspect-video">
            <Image
              src={initialData.imageUrl}
              alt="Uploaded image"
              fill
              className="rounded-md object-cover"
            />
          </div>
        ) : (
          <div className="flex h-60 items-center justify-center rounded-md bg-card brightness-95">
            <ImageIcon className="h-10 w-10 text-card brightness-50" />
          </div>
        ))}
    </section>
  );
};
export default ImageForm;
