"use client";

import Editor from "@/components/editor";
import Preview from "@/components/preview";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface Props {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  description: z.string().min(1),
});

const ChapterDescriptionForm = ({
  initialData,
  courseId,
  chapterId,
}: Props) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: initialData.description || "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        {
          method: "PATCH",
          body: JSON.stringify(values),
        },
      );
      if (!res.ok) {
        throw new Error("Update failed");
      }

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
        Chapter description
        <Button
          variant={"ghost"}
          onClick={toggleEdit}
          className={cn("flex gap-2")}
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4" />
              Edit description
            </>
          )}
        </Button>
      </div>

      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={!isValid || isSubmitting}>
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <div
          className={cn(
            "text-sm",
            !initialData.description && "italic text-muted-foreground",
          )}
        >
          {initialData.description ? (
            <Preview value={initialData.description} />
          ) : (
            "No description"
          )}
        </div>
      )}
    </section>
  );
};
export default ChapterDescriptionForm;
