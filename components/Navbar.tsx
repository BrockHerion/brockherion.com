import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav>
      <ul className="flex items-center">
        <li className="text-gray-800 dark:text-slate-100 mr-6 hover:underline font-inconsolata text-xl">
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className="text-gray-800 dark:text-slate-100 mr-6 hover:underline font-inconsolata text-xl">
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li className="text-gray-800 dark:text-slate-100 mr-6 hover:underline font-inconsolata text-xl">
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </li>
        <li className="text-gray-800 dark:text-slate-100 hover:underline font-inconsolata text-xl">
          <Link href="/projects">
            <a>Projects</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
