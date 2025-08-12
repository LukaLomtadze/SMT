import React from 'react';

const FloatingShape = ({ color, size, left, top }) => {
  return (
    <div
      className={`absolute rounded-full ${size}`}
      style={{
        top,
        left,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: 0.2,
        filter: 'blur(80px)',
        pointerEvents: 'none' // so it never blocks clicks
      }}
      aria-hidden="true"
    />
  );
};

export default FloatingShape;
