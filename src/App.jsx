import React from 'react';
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Story from "./components/Story.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-800 dark:text-slate-100 transition-colors duration-300">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero section */}
      <Hero />

      {/* 3. Story scrollytelling */}
      <Story />

      {/* 4. Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-20">
        <div className="border-t border-gray-200/40 dark:border-slate-900 pt-10 text-center text-gray-400 dark:text-slate-600 transition-colors duration-500">
          <p className="text-sm font-medium">© 2026 LenOVR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;