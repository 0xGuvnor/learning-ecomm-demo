import { db } from "@/lib/db";
import Categories from "./_components/categories";
import { cn } from "@/lib/utils";
import SearchInput from "@/components/search-input";

const SearchPage = async () => {
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  return (
    <>
      <div className={cn("px-6 pt-6", "md:mb-0 md:hidden")}>
        <SearchInput />
      </div>

      <main className="p-6">
        <Categories items={categories} />
      </main>
    </>
  );
};
export default SearchPage;
