import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { HTMLAttributes } from "react";

const bannerVariants = cva(
  "border px-6 py-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-300 text-destructive",
        success: "bg-emerald-700 border-emerald-800 text-gray-200",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  },
);

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

interface BannerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  label: string;
}

const Banner = ({ label, variant, className }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <section
      className={cn("flex gap-x-2", bannerVariants({ variant, className }))}
    >
      <Icon className="h-4 w-4" />
      {label}
    </section>
  );
};
export default Banner;
