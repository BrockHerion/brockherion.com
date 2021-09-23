import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav>
      <ul className="flex items-center">
        <li className="text-gray-100 mr-3 hover:underline font-source-code-pro">
          <Link href="/About">
            <a>About</a>
          </Link>
        </li>
        <li className="text-gray-100 mr-3 hover:underline font-source-code-pro">
          <Link href="/articles">
            <a>Articles</a>
          </Link>
        </li>
        <li className="text-gray-100 mr-3 hover:underline font-source-code-pro">
          <Link href="/tech">
            <a>Tech</a>
          </Link>
        </li>
        <li className="text-gray-100 hover:underline font-source-code-pro">
          <Link href='newsletter'>
            <a>Newsletter</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
