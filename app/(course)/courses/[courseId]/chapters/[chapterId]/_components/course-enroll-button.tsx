"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  courseId: string;
  price: number;
}

const CourseEnrollButton = ({ courseId, price }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(`/api/courses/${courseId}/checkout`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to enroll");
      const data = await res.json();

      window.location.assign(data.url);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      size={"sm"}
      onClick={handleClick}
      disabled={isLoading}
      className={cn("w-full", "md:w-auto")}
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
};
export default CourseEnrollButton;
