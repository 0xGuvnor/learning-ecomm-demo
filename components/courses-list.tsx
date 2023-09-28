import { CourseWithProgressWithCategory } from "@/actions/get-courses";
import { cn } from "@/lib/utils";
import CourseCard from "./course-card";

interface Props {
  items: CourseWithProgressWithCategory[];
}

const CoursesList = ({ items }: Props) => {
  return (
    <div>
      {items.length === 0 ? (
        <div className="text-center text-sm text-muted-foreground">
          No courses found
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-4",
            "sm:grid-cols-2",
            "lg:grid-cols-3",
            "xl:grid-cols-4",
          )}
        >
          {items.map((item) => (
            <CourseCard
              key={item.id}
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl!}
              chaptersLength={item.chapters.length}
              price={item.price!}
              progress={item.progress}
              category={item.category?.name!}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default CoursesList;
