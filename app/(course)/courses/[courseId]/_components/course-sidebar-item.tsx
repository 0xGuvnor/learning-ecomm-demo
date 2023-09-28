"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

const CourseSidebarItem = ({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname.includes(id);

  const handleClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      className={cn(
        "h-auto justify-start rounded-none bg-transparent py-0 pl-6 pr-0 text-sm font-medium text-slate-500 transition-all",
        "hover:bg-primary/10 hover:text-slate-600",
        isActive &&
          "bg-slate-300/20 text-slate-700 hover:bg-slate-300 hover:text-slate-700",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20",
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={24}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700",
          )}
        />
        {label}
      </div>

      <div
        className={cn(
          "ml-auto h-full border-2 border-slate-700 bg-blue-500 opacity-0 transition-all",
          isActive && "opacity-100",
          isCompleted && "border-emerald-700",
        )}
      ></div>
    </Button>
  );
};
export default CourseSidebarItem;
