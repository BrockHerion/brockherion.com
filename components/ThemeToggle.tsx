import { useTheme } from "next-themes";
import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

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
