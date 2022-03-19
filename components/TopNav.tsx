import Branding from "./Branding";

export default function TopNav() {
  return (
    <div className="flex flex-col justify-center w-full items-center">
      <Branding />
      <div className="bg-emerald-400 w-12 h-1 md:mb-4 mt-6"></div>
    </div>
  );
}
