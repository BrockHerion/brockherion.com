import React from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />

      <main>
        {children}
      </main>

      <Footer />

    </>
  );
}

export default Layout;