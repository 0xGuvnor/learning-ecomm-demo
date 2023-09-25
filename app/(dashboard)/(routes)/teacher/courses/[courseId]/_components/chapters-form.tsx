"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter, Course } from "@prisma/client";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import ChaptersList from "./chapters-list";

interface Props {
  initialData: Course & { chapters: Chapter[] };
  courseId: string | null;
}

const formSchema = z.object({
  title: z.string().min(1),
});

const ChaptersForm = ({ initialData, courseId }: Props) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(`/api/courses/${courseId}/chapters`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error("Update failed");
      }

      toast.success("Chapter created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      const res = await fetch(`/api/courses/${courseId}/chapters/reorder`, {
        method: "PUT",
        body: JSON.stringify({ list: updateData }),
      });
      if (!res.ok) throw new Error("Update Failed");

      toast.success("Chapters reordered");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleCreating = () => setIsCreating((prev) => !prev);

  return (
    <section
      className={cn(
        "relative space-y-2 rounded-md border border-none bg-card p-4 shadow-xl",
      )}
    >
      {isUpdating && (
        <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center rounded-md bg-card/70">
          <Loader2 className="w6 h-6 animate-spin text-card-foreground" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        Course chapters
        <Button
          variant={"ghost"}
          onClick={toggleCreating}
          className={cn("flex gap-2")}
        >
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
              Add a chapter
            </>
          )}
        </Button>
      </div>

      {isCreating ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Course Introduction'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={!isValid || isSubmitting}>
              Create
            </Button>
          </form>
        </Form>
      ) : (
        <>
          {!initialData.chapters.length ? (
            <p className={cn("text-sm italic text-muted-foreground")}>
              No chapters
            </p>
          ) : (
            <ChaptersList
              onEdit={onEdit}
              onReorder={onReorder}
              items={initialData.chapters || []}
            />
          )}

          <p className="text-xs text-muted-foreground">
            Drag and drop to reorder the chapters
          </p>
        </>
      )}
    </section>
  );
};
export default ChaptersForm;
