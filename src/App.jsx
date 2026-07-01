import React from 'react';
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Story from "./components/Story.jsx";
import Story2 from "./components/Story2.jsx";
import Story3 from "./components/Story3.jsx";
import Story4 from "./components/Story4.jsx";
import Story5 from "./components/Story5.jsx";
import Story6 from "./components/Story6.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-800 dark:text-slate-100 transition-colors duration-300">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero section */}
      <Hero />

      {/* 3. Story scrollytelling */}
      <Story />
      <Story2 />
      <Story3 />
      <Story4 />
      <Story5 />
      <Story6 />

      <Footer />
    </div>
  );
}

export default App;