import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav>
      <ul className="flex items-center">
        <li className="text-gray-100 mr-6 hover:underline font-source-code-pro text-lg">
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li className="text-gray-100 mr-6 hover:underline font-source-code-pro text-lg">
          <Link href="https://blog.brockherion.dev">
            <a>Blog</a>
          </Link>
        </li>
        <li className="text-gray-100 mr-6 hover:underline font-source-code-pro text-lg">
          <Link href="/tech">
            <a>Tech</a>
          </Link>
        </li>
        <li className="text-gray-100 hover:underline font-source-code-pro text-lg">
          <Link href='/newsletter'>
            <a>Newsletter</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
