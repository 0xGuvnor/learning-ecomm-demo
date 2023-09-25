"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await res.json();

      toast.success("Course created");
      router.push(`/teacher/courses/${data.id}`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className={cn(
        "mx-auto flex h-full max-w-5xl p-6",
        "md:items-center md:justify-center",
      )}
    >
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl">Name your course</h1>
          <p className="text-sm text-foreground/70">
            What would you like to name your course? Don&apos;t worry, you can
            change this later.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("space-y-4")}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced iPhone photography techniques'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button variant={"ghost"} type="button" asChild>
                <Link href={"/"}>Cancel</Link>
              </Button>

              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default CreatePage;
