import React, { useState } from 'react';
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
import AboutMe from "./components/AboutMe.jsx";
import ProductPage from "./components/ProductPage.jsx";
import { ShopProvider } from "./context/ShopContext.jsx";

function App() {
  // State điều hướng trang đơn giản (không cần router)
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ShopProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-800 dark:text-slate-100 transition-colors duration-300">
        {/* 1. Thanh điều hướng (Navbar) — luôn hiển thị */}
        <Navbar currentPage={currentPage} onNavigate={navigate} />

        {/* 2. Render nội dung theo trang hiện tại */}
        {currentPage === "home" && (
          <>
            {/* Phần Hero */}
            <Hero onNavigate={navigate} />

            {/* Phần kể chuyện cuộn (Story) */}
            <Story />
            <Story2 />
            <Story3 />
            <Story4 />
            <Story5 />

            {/* Sản phẩm & Phụ kiện */}
            <Products />
            <Story6 />
            <Footer />
          </>
        )}

        {currentPage === "about" && (
          <>
            <AboutMe onNavigate={navigate} />
            <Footer />
          </>
        )}

        {currentPage === "product" && (
          <>
            <ProductPage />
            <Footer />
          </>
        )}

        {/* Luôn hiển thị bất kể trang nào */}
        <CartDrawer />
        <AIChatBox />
      </div>
    </ShopProvider>
  );
}

export default App;