import React from 'react';

interface PageHeaderProps {
  headingText: string;
}

export default function PageHeader({ headingText }: PageHeaderProps) {
  return (
    <h1 className="text-5xl text-white">
      {headingText}
    </h1>
  )
}
