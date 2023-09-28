import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import IconBadge from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import CourseProgress from "./course-progress";

interface Props {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: Props) => {
  return (
    <Link href={`/courses/${id}`}>
      <div
        className={cn(
          "group h-full space-y-2 overflow-hidden rounded-lg border p-3 transition",
          "hover:shadow-xl",
        )}
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>

        <div className="flex flex-col">
          <div
            className={cn(
              "line-clamp-2 text-lg font-medium transition",
              "group-hover:text-primary",
              "md:text-base",
            )}
          >
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div
            className={cn(
              "my-3 flex items-center gap-x-2 text-sm",
              "md:text-xs",
            )}
          >
            <div className="flex items-center gap-x-1 text-muted-foreground">
              <IconBadge icon={BookOpen} size={"sm"} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>

          {progress !== null ? (
            <CourseProgress
              size="sm"
              value={progress}
              variant={progress === 100 ? "success" : "default"}
            />
          ) : (
            <p
              className={cn(
                "font-medium text-muted text-slate-700",
                "md:text-sm",
              )}
            >
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
export default CourseCard;
