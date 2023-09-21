import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div>
      <p className={cn("bg-red-500 text-3xl")}>Hello World</p>
      <Button>Test</Button>
    </div>
  );
}
