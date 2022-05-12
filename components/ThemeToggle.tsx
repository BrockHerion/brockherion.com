import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true));

  if (!mounted) {
    return null;
  }

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? (
        <IoSunnySharp className="text-yellow-300" size="1.2em" />
      ) : (
        <IoMoonSharp className="text-gray-800" size="1.2em" />
      )}
    </button>
  );
}
