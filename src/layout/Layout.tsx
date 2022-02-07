import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";

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
