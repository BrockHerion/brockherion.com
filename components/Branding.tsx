import Link from "next/link";
import React from "react";

function Branding() {
  return (
    <div>
      <Link href="/">
        <a className="flex items-center">
          <span className="text-2xl text-gray-100 ">[Brock Herion]</span>
        </a>
      </Link>
    </div>
  );
}

export default Branding;
