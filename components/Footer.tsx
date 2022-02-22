import React from "react";
import FooterSocialIcons from "./FooterSocialIcons";

export default function Footer() {
  return (
    <footer className="flex-none 2xl:px-96 xl:px-72 lg:px-36 md:px-16 px-4 pt-6 flex flex-col items-center">
      <div className="bg-emerald-400 w-12 h-1 mb-4"></div>
      <section>
        <FooterSocialIcons />
      </section>
      <section className="flex items-center justify-center py-4">
        <small>&copy;Brock Herion 2021</small>
      </section>
    </footer>
  );
}
