import { UserButton } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
export default Page;
