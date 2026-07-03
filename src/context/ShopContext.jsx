import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

// Initial state helpers
const loadFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

export const ShopProvider = ({ children }) => {
  // States
  const [cart, setCart] = useState(() => loadFromStorage('psvr_cart', []));
  const [wishlist, setWishlist] = useState(() => loadFromStorage('psvr_wishlist', []));
  const [recentlyViewed, setRecentlyViewed] = useState(() => loadFromStorage('psvr_recently_viewed', []));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState('cart'); // 'cart', 'wishlist', 'history'

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('psvr_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('psvr_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('psvr_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Actions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    
    // Automatically open the drawer and switch to cart tab
    setDrawerTab('cart');
    setIsDrawerOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const addRecentlyViewed = (product) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists to move it to the top
      const filtered = prev.filter((item) => item.id !== product.id);
      // Keep only last 10 items
      return [product, ...filtered].slice(0, 10);
    });
  };

  const clearCart = () => setCart([]);
  
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const value = {
    cart,
    wishlist,
    recentlyViewed,
    isDrawerOpen,
    drawerTab,
    cartTotal,
    cartCount,
    wishlistCount,
    setIsDrawerOpen,
    setDrawerTab,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    isInWishlist,
    addRecentlyViewed,
    clearCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
