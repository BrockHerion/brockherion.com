import hljs from "highlight.js";
import "highlight.js/styles/nord.css";
import { useEffect } from "react";

interface BlogBodyProps {
  children: React.ReactNode;
}

export function BlogBody({ children }: BlogBodyProps) {
  useEffect(() => {
    hljs.initHighlighting();
  }, []);

  return (
    <div className="text-white flex flex-col space-y-4 my-6 py-6 text-lg tracking-wider">
      {children}
    </div>
  );
}
