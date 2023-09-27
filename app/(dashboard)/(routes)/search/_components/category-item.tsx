"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";

interface Props {
  label: string;
  icon?: IconType;
  value?: string;
}

const CategoryItem = ({ label, icon: Icon, value }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategoryId = searchParams.get("categoryId");
  const selectedTitle = searchParams.get("title");
  const isSelected = selectedCategoryId === value;

  const handleClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: selectedTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  };

  return (
    <Button
      variant={"ghost"}
      type="button"
      onClick={handleClick}
      className={cn(
        "flex h-auto items-center gap-x-1 rounded-full border border-muted px-3 py-2 text-sm transition",
        "hover:border-border",
        isSelected &&
          "border-border bg-primary text-primary-foreground transition hover:bg-primary/80 hover:text-primary-foreground",
      )}
    >
      {Icon && <Icon size={20} />}
      <span className="truncate">{label}</span>
    </Button>
  );
};
export default CategoryItem;
