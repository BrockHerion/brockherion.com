import Navbar from "./Navbar";
import SocialNav from "./SocialNav";
import ThemeToggle from "./ThemeToggle";

export default function BottomNav() {
  return (
    <div className="flex justify-between items-center w-full my-6 flex-col-reverse md:flex-row">
      <Navbar />
      <div className="flex items-center mb-6 md:mb-0">
        <SocialNav />
        <ThemeToggle />
      </div>
    </div>
  );
}
