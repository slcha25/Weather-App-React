import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export default function Header() {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ["Real-time Weather"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
    };

    const typed = new Typed(typedRef.current, options);

    // Cleanup function
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <header className="header">
      <h1>Weather App</h1>
      <h2><span ref={typedRef}></span></h2>
    </header>
  );
}