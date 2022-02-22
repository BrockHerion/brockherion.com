import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="2xl:px-96 xl:px-72 lg:px-36 md:px-16 px-4 py-6 dark:text-slate-100 text-gray-800">
      {children}
    </div>
  );
}
