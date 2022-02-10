import React from "react";

interface PageHeaderProps {
  headingText: string;
}

export default function PageHeader({ headingText }: PageHeaderProps) {
  return (
    <h1 className="text-5xl text-white font-source-code-pro">
      {headingText}
      <div className="w-16 h-2 mt-4 bg-emerald-500"></div>
    </h1>
  );
}
