import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col bg-gray-800 min-h-screen">
      <Header />

      <Main>{children}</Main>

      <Footer />
    </div>
  );
}

export default Layout;
