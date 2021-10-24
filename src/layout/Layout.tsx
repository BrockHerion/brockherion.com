import React from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col items-stretch min-h-screen">
      <Header />

      <main className="flex-1 h-full">
        {children}
      </main>

      <Footer />

    </div>
  );
}

export default Layout;