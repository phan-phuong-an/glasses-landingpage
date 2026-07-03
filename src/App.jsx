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
import AIChatBox from "./components/AIChatBox.jsx";
import Products from "./components/Products.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import { ShopProvider } from "./context/ShopContext.jsx";

function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-800 dark:text-slate-100 transition-colors duration-300">
        {/* 1. Thanh điều hướng (Navbar) */}
        <Navbar />

        {/* 2. Phần Hero */}
        <Hero />

        {/* 3. Phần kể chuyện cuộn (Story) */}
        <Story />
        <Story2 />
        <Story3 />
        <Story4 />
        <Story5 />
        {/* 4. Sản phẩm & Phụ kiện */}
        <Products />
        <Story6 />
        <Footer />
        <CartDrawer />
        <AIChatBox />
      </div>
    </ShopProvider>
  );
}

export default App;