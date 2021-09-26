import React from 'react';
import Branding from './Branding';
import Navbar from './Navbar';

function Header() {
  return (
    <header className='2xl:px-96 xl:px-72 lg:px-36 md:px-16 px-4 py-6 bg-gray-800 flex items-center justify-between'>
      <Branding />
      <Navbar />
    </header>
  );
}

export default Header;
