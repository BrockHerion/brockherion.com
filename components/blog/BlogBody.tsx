import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import { useEffect } from "react";

interface BlogBodyProps {
  children: React.ReactNode;
}

export function BlogBody({ children }: BlogBodyProps) {
  useEffect(() => {
    hljs.initHighlighting();
  }, []);

  return (
    <div className="flex flex-col my-6 pb-6 text-lg tracking-wider post">
      {children}
    </div>
  );
}
