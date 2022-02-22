interface BlogSectionHeadingProps {
  heading: string;
}

export function BlogSectionHeading({ heading }: BlogSectionHeadingProps) {
  return (
    <h2 className="text-3xl my-2">
      {heading} <div className="w-16 h-1 mt-2 bg-emerald-400"></div>
    </h2>
  );
}
