import React from 'react';
import Search from './Search';
import TypedText from './Typedtext';

const CustomBackground = ({ imageUrl }) => {
    
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center imgtxt">
          <h1 className="text-center z-10 text-2xl">
            <span className='madimi-one-regular text-7xl text-red-600'>A StudioBook</span> <br />
            <span className='text-white poppins-thin-light'>Book Best <strong><TypedText /></strong> Photographer in just a few minutes</span>
          </h1>
          <Search />
        </div>
      </div>
    </div>
  );
};

export default CustomBackground;
