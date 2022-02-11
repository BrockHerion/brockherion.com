import Image from "next/image";

interface BlogPostHeadingProps {
  title: string;
  subTitle?: string;
  imageSrc?: string;
}

export function BlogPostHeading({
  title,
  subTitle,
  imageSrc,
}: BlogPostHeadingProps) {
  return (
    <>
      <h1 className="md:text-5xl text-3xl text-white py-6">
        {title}
        <div className="w-16 h-2 mt-4 bg-emerald-500"></div>
      </h1>
      <h2 className="md:text-2xl text-xl text-white mb-4 opacity-60">
        {subTitle}
      </h2>
      <Image
        src={imageSrc}
        width={1600}
        height={840}
        alt={title}
        className="rounded-md"
      />
    </>
  );
}
