import IconBadge from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  numberOfItems: number;
  variant?: "default" | "success";
}

const InfoCard = ({ icon: Icon, label, numberOfItems, variant }: Props) => {
  return (
    <div className="flex items-center gap-x-2 rounded-md border p-3">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};
export default InfoCard;
