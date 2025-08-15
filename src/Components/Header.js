import React from 'react';
import { useEffect } from 'react';
import 'https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js';

export default function Header() {
useEffect(() => {
    // Check if Typed.js is available globally
    if (typeof window.Typed === 'undefined') {
        console.error('Typed.js library is not loaded.');
    }
}, []); // Empty dependency array to run this effect only once when the component mounts
// Ensure Typed.js is loaded and initialize it
useEffect(() => {  
    const script = document.createElement('script');  // Create a script element to load Typed.js
    script.src = "https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js";
    script.async = true;
    script.onload = () => {
        if (window.Typed) {  
            new window.Typed('.auto-type', {
                strings: ["Real-time Weather"],
                typeSpeed: 50,
                backSpeed: 50,
                loop: true
            });
        }
    };
    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script); // Clean up the script when the component unmounts
    };
}, []);
    return (
        <header className="header">
        <h1>Weather App</h1>
        <h2><span className="auto-type"></span></h2>
        {/* The auto-type effect will be handled by the Typed.js library */}
        </header>
    );
    }

