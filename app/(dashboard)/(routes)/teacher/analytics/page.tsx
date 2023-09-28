import getAnalytics from "@/actions/get-analytics";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DataCard from "./_components/data-card";
import Chart from "./_components/chart";

const AnalyticsPage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/");

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <main className="p-6">
      <div className={cn("mb-4 grid grid-cols-1 gap-4", "md:grid-cols-2")}>
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />
      </div>

      <Chart data={data} />
    </main>
  );
};
export default AnalyticsPage;
