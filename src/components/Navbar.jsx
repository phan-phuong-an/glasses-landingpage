import React, { useState, useEffect } from "react";
import { Moon, Sun, ChevronDown, Sparkles, Menu, X, ShoppingCart, Heart } from "lucide-react";
import { useShop } from "../context/ShopContext";

const Navbar = ({ currentPage, onNavigate }) => {
  // Trạng thái kiểm tra xem người dùng đã cuộn trang hay chưa
  const [isScrolled, setIsScrolled] = useState(false);

  // Trạng thái điều khiển Mobile Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lấy dữ liệu từ ShopContext
  const { cartCount, wishlistCount, setIsDrawerOpen, setDrawerTab } = useShop();

  // Trạng thái Theme (Light / Dark)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Theo dõi sự kiện cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Cập nhật class theme trên thẻ html
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // Đóng mobile menu khi chuyển hướng hoặc resize màn hình lớn
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-250/50 dark:border-slate-900 shadow-sm py-3"
        : "bg-transparent border-b border-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">

        {/* Cụm 1: Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('home')}>
          <div className="bg-indigo-600 dark:bg-violet-600 text-white p-1.5 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Sparkles size={18} className="fill-white/20" />
          </div>
          <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight transition-colors">
            LenOVR
          </span>
        </div>

        {/* Cụm 2: Menu điều hướng (Center Links) */}
        <div className="hidden lg:flex items-center bg-gray-100/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-full p-1 border border-gray-200/40 dark:border-slate-800/60">
          <button
            onClick={() => onNavigate('home')}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${currentPage === 'home'
                ? 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-xs'
                : 'text-gray-600 dark:text-slate-400 hover:text-gray-950 dark:hover:text-white'
              }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${currentPage === 'about'
                ? 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-xs'
                : 'text-gray-600 dark:text-slate-400 hover:text-gray-950 dark:hover:text-white'
              }`}
          >
            About Me
          </button>
          <button
            onClick={() => onNavigate('product')}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${currentPage === 'product'
                ? 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-xs'
                : 'text-gray-600 dark:text-slate-400 hover:text-gray-950 dark:hover:text-white'
              }`}
          >
            Product
          </button>
          <a href="#" className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-slate-400 hover:text-gray-950 dark:hover:text-white transition-colors rounded-full">
            Contact
          </a>
        </div>

        {/* Cụm 3: Các nút hành động bên phải */}
        <div className="flex items-center gap-4">
          {/* Nút bật/tắt Dark Mode */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2.5 rounded-full bg-white dark:bg-slate-900/60 text-gray-600 dark:text-slate-400 border border-gray-200/60 dark:border-slate-800 hover:text-gray-950 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800/80 transition-all shadow-xs cursor-pointer"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Nút Yêu thích */}
          <button
            onClick={() => {
              setDrawerTab('wishlist');
              setIsDrawerOpen(true);
            }}
            aria-label="Wishlist"
            className="relative p-2.5 rounded-full bg-white dark:bg-slate-900/60 text-gray-600 dark:text-slate-400 border border-gray-200/60 dark:border-slate-800 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-slate-800/80 transition-all shadow-xs cursor-pointer"
          >
            <Heart size={18} className={wishlistCount > 0 ? "text-red-500 fill-current" : ""} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-950">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Nút Giỏ hàng */}
          <button
            onClick={() => {
              setDrawerTab('cart');
              setIsDrawerOpen(true);
            }}
            aria-label="Cart"
            className="relative p-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-950 animate-bounce-short">
                {cartCount}
              </span>
            )}
          </button>

          <a href="#" className="hidden sm:block text-sm font-medium text-gray-600 dark:text-slate-400 hover:text-gray-950 dark:hover:text-white transition-colors px-2">
            Sign In
          </a>

          {/* Hamburger Menu Button cho mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="p-2.5 rounded-full text-gray-600 dark:text-slate-450 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors lg:hidden cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Panel Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-b border-gray-250/50 dark:border-slate-900 py-6 px-6 transition-all duration-300 shadow-xl flex flex-col gap-4 mt-3 rounded-2xl">
            <button
              onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}
              className={`px-4 py-2.5 text-base font-semibold rounded-xl text-left transition-colors ${currentPage === 'home'
                  ? 'bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-slate-300 hover:text-gray-950 dark:hover:text-white'
                }`}
            >
              Home
            </button>
            <button
              onClick={() => { onNavigate('about'); setIsMobileMenuOpen(false); }}
              className={`px-4 py-2.5 text-base font-medium rounded-xl text-left transition-colors ${currentPage === 'about'
                  ? 'bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white font-semibold'
                  : 'text-gray-600 dark:text-slate-300 hover:text-gray-950 dark:hover:text-white'
                }`}
            >
              About Me
            </button>
            <button
              onClick={() => { onNavigate('product'); setIsMobileMenuOpen(false); }}
              className={`px-4 py-2.5 text-base font-medium rounded-xl text-left transition-colors ${currentPage === 'product'
                  ? 'bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white font-semibold'
                  : 'text-gray-600 dark:text-slate-300 hover:text-gray-950 dark:hover:text-white'
                }`}
            >
              Product
            </button>
            <a
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 text-base font-medium text-gray-600 dark:text-slate-300 hover:text-gray-950 dark:hover:text-white rounded-xl transition-colors"
            >
              Contact
            </a>

            <div className="border-t border-gray-100 dark:border-slate-800/80 my-2 pt-4 flex flex-col gap-3">
              <a
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center py-2.5 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:text-gray-950 dark:hover:text-white"
              >
                Sign In
              </a>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;