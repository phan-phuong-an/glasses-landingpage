import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Heart, Clock, Plus, Minus, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatVND } from './Products';

const CartDrawer = () => {
  const { 
    isDrawerOpen, 
    setIsDrawerOpen, 
    drawerTab, 
    setDrawerTab,
    cart,
    wishlist,
    recentlyViewed,
    cartTotal,
    updateQuantity,
    removeFromCart,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useShop();

  if (!isDrawerOpen) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsDrawerOpen(false)}
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60]"
      />

      {/* Drawer */}
      <motion.div
        key="drawer"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full sm:w-[400px] md:w-[450px] bg-white dark:bg-slate-900 shadow-2xl z-[70] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {drawerTab === 'cart' && <ShoppingCart size={22} className="text-indigo-600" />}
            {drawerTab === 'wishlist' && <Heart size={22} className="text-red-500" />}
            {drawerTab === 'history' && <Clock size={22} className="text-blue-500" />}
            {drawerTab === 'cart' ? 'Giỏ hàng của bạn' : drawerTab === 'wishlist' ? 'Sản phẩm yêu thích' : 'Sản phẩm đã xem'}
          </h2>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 bg-gray-100 dark:bg-slate-800 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
          <button
            onClick={() => setDrawerTab('cart')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              drawerTab === 'cart' 
              ? 'text-indigo-600 border-b-2 border-indigo-600' 
              : 'text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Giỏ hàng ({cart.length})
          </button>
          <button
            onClick={() => setDrawerTab('wishlist')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              drawerTab === 'wishlist' 
              ? 'text-red-500 border-b-2 border-red-500' 
              : 'text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Yêu thích ({wishlist.length})
          </button>
          <button
            onClick={() => setDrawerTab('history')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              drawerTab === 'history' 
              ? 'text-blue-500 border-b-2 border-blue-500' 
              : 'text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Đã xem
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-700">
          
          {/* Cart Tab */}
          {drawerTab === 'cart' && (
            <div className="flex flex-col gap-6">
              {cart.length === 0 ? (
                <div className="text-center py-12 flex flex-col items-center">
                  <ShoppingCart size={48} className="text-gray-300 dark:text-slate-700 mb-4" />
                  <p className="text-gray-500 dark:text-slate-400">Giỏ hàng của bạn đang trống</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm">
                    <div className="w-20 h-20 bg-gray-50 dark:bg-slate-900 rounded-xl p-2 flex-shrink-0">
                      <img loading="lazy" src={item.image || item.img} alt={item.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-1 text-sm">{item.name}</h4>
                        <p className="text-indigo-600 font-medium mt-1">{formatVND(item.price)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-gray-100 dark:bg-slate-900 rounded-lg p-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors">
                            <Minus size={14} className="text-gray-600 dark:text-slate-300" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors">
                            <Plus size={14} className="text-gray-600 dark:text-slate-300" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {drawerTab === 'wishlist' && (
            <div className="flex flex-col gap-4">
              {wishlist.length === 0 ? (
                <div className="text-center py-12 flex flex-col items-center">
                  <Heart size={48} className="text-gray-300 dark:text-slate-700 mb-4" />
                  <p className="text-gray-500 dark:text-slate-400">Bạn chưa thích sản phẩm nào</p>
                </div>
              ) : (
                wishlist.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm items-center">
                    <img loading="lazy" src={item.image || item.img} alt={item.name} className="w-16 h-16 object-contain bg-gray-50 dark:bg-slate-900 rounded-lg p-2 mix-blend-multiply dark:mix-blend-normal" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-1 text-sm">{item.name}</h4>
                      <p className="text-gray-500 dark:text-slate-400 text-xs mt-1">{formatVND(item.price)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => addToCart(item)} className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        <ShoppingCart size={16} />
                      </button>
                      <button onClick={() => toggleWishlist(item)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 dark:bg-slate-700 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* History Tab */}
          {drawerTab === 'history' && (
            <div className="flex flex-col gap-4">
              {recentlyViewed.length === 0 ? (
                <div className="text-center py-12 flex flex-col items-center">
                  <Clock size={48} className="text-gray-300 dark:text-slate-700 mb-4" />
                  <p className="text-gray-500 dark:text-slate-400">Bạn chưa xem sản phẩm nào</p>
                </div>
              ) : (
                recentlyViewed.map(item => (
                  <div key={item.id} className="flex gap-4 p-3 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer group items-center">
                    <img loading="lazy" src={item.image || item.img} alt={item.name} className="w-12 h-12 object-contain mix-blend-multiply dark:mix-blend-normal" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1 text-sm group-hover:text-indigo-600 transition-colors">{item.name}</h4>
                      <p className="text-gray-500 dark:text-slate-400 text-xs mt-0.5">{formatVND(item.price)}</p>
                    </div>
                    <button onClick={() => addToCart(item)} className="opacity-0 group-hover:opacity-100 p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-lg transition-all">
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer (Checkout for Cart) */}
        {drawerTab === 'cart' && cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 dark:text-slate-400 font-medium">Tổng tiền</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatVND(cartTotal)}</span>
            </div>
            <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95">
              Thanh Toán Ngay
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CartDrawer;
