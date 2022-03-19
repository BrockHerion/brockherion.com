import React from "react";
import BottomNav from "./BottomNav";
import TopNav from "./TopNav";

function Header() {
  return (
    <header className="flex-none 2xl:px-96 xl:px-72 lg:px-36 md:px-16 px-4 pt-12 flex flex-col items-center md:justify-between justify-center">
      <TopNav />
      <BottomNav />
    </header>
  );
}

export default Header;
