import React, { useState, Suspense, lazy } from 'react';
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import { ShopProvider } from "./context/ShopContext.jsx";

// Lazy load các component không cần thiết ở màn hình đầu tiên (dưới màn hình)
const Story = lazy(() => import('./components/Story.jsx'));
const Story2 = lazy(() => import('./components/Story2.jsx'));
const Story3 = lazy(() => import('./components/Story3.jsx'));
const Story4 = lazy(() => import('./components/Story4.jsx'));
const Story5 = lazy(() => import('./components/Story5.jsx'));
const Story6 = lazy(() => import('./components/Story6.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));
const AIChatBox = lazy(() => import('./components/AIChatBox.jsx'));
const Products = lazy(() => import('./components/Products.jsx'));
const CartDrawer = lazy(() => import('./components/CartDrawer.jsx'));
const AboutMe = lazy(() => import('./components/AboutMe.jsx'));
const ProductPage = lazy(() => import('./components/ProductPage.jsx'));
const ContactPage = lazy(() => import('./components/ContactPage.jsx'));

// Component hiển thị khi đang tải (Loading fallback)
const LoadingFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
  </div>
);

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
            {/* Phần Hero bắt buộc hiển thị ngay lập tức (Không bọc trong Suspense) */}
            <Hero onNavigate={navigate} />

            {/* Các phần bên dưới màn hình sẽ được lazy load */}
            <Suspense fallback={<LoadingFallback />}>
              <Story />
              <Story2 />
              <Story3 />
              <Story4 />
              <Story5 />
              <Products />
              <Story6 />
              <Footer />
            </Suspense>
          </>
        )}

        {currentPage === "about" && (
          <Suspense fallback={<LoadingFallback />}>
            <AboutMe onNavigate={navigate} />
            <Footer />
          </Suspense>
        )}

        {currentPage === "product" && (
          <Suspense fallback={<LoadingFallback />}>
            <ProductPage />
            <Footer />
          </Suspense>
        )}

        {currentPage === "contact" && (
          <Suspense fallback={<LoadingFallback />}>
            <ContactPage />
            <Footer />
          </Suspense>
        )}

        {/* Luôn hiển thị bất kể trang nào */}
        <Suspense fallback={null}>
          <CartDrawer />
          <AIChatBox />
        </Suspense>
      </div>
    </ShopProvider>
  );
}

export default App;