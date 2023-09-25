"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface Props {
  initialData: Course;
  courseId: string | null;
}

const formSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
});

const DescriptionForm = ({ initialData, courseId }: Props) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: initialData.description || "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: "PATCH",
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error("Update failed");
      }

      toast.success("Description updated");
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
        Course description
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
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'This course is about..."
                      {...field}
                    />
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
        <p
          className={cn(
            "text-sm",
            !initialData.description && "italic text-muted-foreground",
          )}
        >
          {initialData.description || "No description"}
        </p>
      )}
    </section>
  );
};
export default DescriptionForm;
