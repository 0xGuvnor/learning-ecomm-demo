import Image from "next/image";

const Logo = () => {
  return (
    <section className="flex items-center gap-x-1">
      <Image src="/logo.svg" alt="Logo" height={44} width={44} />
      <span className="text-3xl">
        X<span className="text-xl uppercase">celerate</span>
      </span>
    </section>
  );
};
export default Logo;
