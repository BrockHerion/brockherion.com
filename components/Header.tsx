import React from "react";
import Branding from "./Branding";
import Navbar from "./Navbar";

function Header() {
  return (
    <header className="flex-none 2xl:px-96 xl:px-72 lg:px-36 md:px-16 px-4 pt-6 bg-gray-800 flex md:flex-row flex-col space-y-4 md:space-y-0 items-center md:justify-between justify-center">
      <Branding />
      <Navbar />
    </header>
  );
}

export default Header;
