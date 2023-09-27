"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface Props {}

const SearchInput = ({}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const selectedCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: selectedCategoryId,
          title: debouncedValue,
        },
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  }, [debouncedValue, selectedCategoryId, pathname, router]);

  return (
    <section className="relative">
      <Search className="absolute inset-y-0 left-3 h-full w-4 text-muted-foreground" />
      <Input
        placeholder="Seach for a course..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          "w-full rounded-full border-none bg-[#FFFAFA] pl-9",
          "focus-visible:ring-primary",
          "md:w-[300px]",
        )}
      />
    </section>
  );
};
export default SearchInput;
