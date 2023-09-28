import { db } from "@/lib/db";
import Categories from "./_components/categories";
import { cn } from "@/lib/utils";
import SearchInput from "@/components/search-input";
import getCourses from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CoursesList from "@/components/courses-list";

interface Props {
  searchParams: { title: string; categoryId: string };
}

const SearchPage = async ({ searchParams }: Props) => {
  const { userId } = auth();
  if (!userId) redirect("/");

  const categories = await db.category.findMany({ orderBy: { name: "asc" } });
  const courses = await getCourses({ userId, ...searchParams });

  return (
    <>
      <div className={cn("px-6 pt-6", "md:mb-0 md:hidden")}>
        <SearchInput />
      </div>

      <main className="space-y-10 p-6">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </main>
    </>
  );
};
export default SearchPage;
