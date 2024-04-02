import React, { useEffect } from 'react';
import Typed from 'typed.js';

const TypedText = () => {
  useEffect(() => {
    const typed = new Typed(".text", {
      strings: ["Wedding", "Babies Kids", "Special Ocassion", "Commercial", "Corporate Events", "Nature", "Portfolio"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
      showCursor: false
    });

    return () => {
      typed.destroy();
    };
  }, []); // empty dependency array ensures that this effect runs only once after the component mounts

  return (
    <div className="text text-4xl text-slate-400 poppins-thin"></div>
  );
}

export default TypedText;
