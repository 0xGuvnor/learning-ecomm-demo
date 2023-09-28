import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface Props {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

const colourByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

const CourseProgress = ({ value, variant, size }: Props) => {
  return (
    <div className="space-y-2">
      <Progress value={value} variant={variant} className="h-2" />
      <p
        className={cn(
          "font-medium text-sky-700",
          colourByVariant[variant || "default"],
          sizeByVariant[size || "default"],
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};
export default CourseProgress;
