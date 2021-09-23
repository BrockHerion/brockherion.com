import React from 'react';
import { Terminal } from 'react-feather';

function Branding() {
  return (
    <div className='flex items-center'>
      <Terminal color='#f3f4f6' />
      <span className='text-lg text-gray-100 font-source-code-pro'>Brock Herion</span>
    </div>
  );
}

export default Branding;
