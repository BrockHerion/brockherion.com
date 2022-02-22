import { useTheme } from "next-themes";
import React from "react";
import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";
import Branding from "./Branding";
import Navbar from "./Navbar";

function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex-none 2xl:px-96 xl:px-72 lg:px-36 md:px-16 px-4 pt-6 flex md:flex-row flex-col space-y-4 md:space-y-0 items-center md:justify-between justify-center">
      <Branding />
      <div className="flex items-center space-x-4">
        <Navbar />
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? (
            <IoSunnySharp className="text-yellow-300" size="1.2em" />
          ) : (
            <IoMoonSharp className="text-gray-800" size="1.2em" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
