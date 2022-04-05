import Link from "next/link";
import React from "react";

function Branding() {
  return (
    <Link href="/">
      <a className="flex items-center">
        <span className="text-4xl md:5xl text-gray-800 dark:text-slate-100 font-inconsolata">
          Brock Herion
        </span>
      </a>
    </Link>
  );
}

export default Branding;
