// src/components/Star.jsx
import React from 'react';

const Star = ({ filled, onClick }) => (
  <span 
    onClick={onClick} 
    className={`cursor-pointer text-4xl ${filled ? 'text-yellow-500' : 'text-gray-400'}`}
  >
    {filled ? '★' : '☆'}
  </span>
);

export default Star;
