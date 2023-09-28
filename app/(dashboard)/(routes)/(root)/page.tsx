import getDashboardCourses from "@/actions/get-dashboard-courses";
import CoursesList from "@/components/courses-list";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import InfoCard from "./_components/info-card";
import { CheckCircle, Clock } from "lucide-react";

const DashboardPage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/");

  const { completedCourses, coursesInProgress } =
    await getDashboardCourses(userId);
  return (
    <div className="space-y-4 p-6">
      <div className={cn("grid grid-cols-1 gap-4", "sm:grid-cols-2")}>
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          variant="success"
          label="Completed"
          numberOfItems={completedCourses.length}
        />
      </div>

      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
};
export default DashboardPage;
