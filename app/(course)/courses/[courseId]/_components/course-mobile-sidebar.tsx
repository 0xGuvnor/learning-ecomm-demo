import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { Menu } from "lucide-react";
import CourseSidebar from "./course-sidebar";

interface Props {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseMobileSidebar = ({ course, progressCount }: Props) => {
  return (
    <Sheet>
      <SheetTrigger
        className={cn("pr-4 transition", "hover:opacity-75", "md:hidden")}
      >
        <Menu />
      </SheetTrigger>

      <SheetContent forceMount className="w-72 p-0" side={"left"}>
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};
export default CourseMobileSidebar;
