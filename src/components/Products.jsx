import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

// Mock data
const PRODUCTS = [
  {
    id: 'psvr2-headset',
    name: 'PlayStation VR2 Headset',
    price: 14500000,
    category: 'Kính Thực Tế Ảo',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=500&q=80',
    description: 'Trải nghiệm đỉnh cao với màn hình 4K HDR, theo dõi mắt và phản hồi xúc giác.'
  },
  {
    id: 'psvr2-sense-controller',
    name: 'PS VR2 Sense™ Controller',
    price: 2490000,
    category: 'Tay Cầm',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=500&q=80',
    description: 'Cảm biến vuốt, phản hồi xúc giác và Trigger thích ứng độc đáo.'
  },
  {
    id: 'psvr2-charging-station',
    name: 'Trạm Sạc Tay Cầm PS VR2 Sense',
    price: 1290000,
    category: 'Phụ Kiện',
    image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=500&q=80',
    description: 'Sạc cùng lúc hai tay cầm nhanh chóng, thiết kế gọn gàng, tinh tế.'
  },
  {
    id: 'horizon-cotm',
    name: 'Horizon Call of the Mountain',
    price: 1490000,
    category: 'Trò Chơi',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=500&q=80',
    description: 'Khám phá thế giới hùng vĩ qua góc nhìn hoàn toàn mới của Ryas.'
  },
  {
    id: 'resident-evil-village',
    name: 'Resident Evil Village VR',
    price: 1290000,
    category: 'Trò Chơi',
    image: 'https://images.unsplash.com/photo-1577741314755-048d8525d31e?auto=format&fit=crop&w=500&q=80',
    description: 'Đắm chìm vào nỗi sợ hãi tột cùng với chế độ VR kinh dị sinh tồn.'
  },
  {
    id: 'pulse-3d-headset',
    name: 'Tai Nghe Pulse 3D Wireless',
    price: 2690000,
    category: 'Âm Thanh',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=80',
    description: 'Âm thanh 3D sống động, thiết kế đồng bộ hoàn hảo với PSVR2 và PS5.'
  },
  {
    id: 'psvr2-pc-adapter',
    name: 'Cáp PC Adapter cho PSVR2',
    price: 1590000,
    category: 'Phụ Kiện',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80',
    description: 'Mở rộng thư viện game của bạn bằng cách kết nối PSVR2 với PC.'
  },
  {
    id: 'psvr2-carrying-case',
    name: 'Túi Đựng Chống Sốc PSVR2',
    price: 890000,
    category: 'Phụ Kiện',
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=500&q=80',
    description: 'Bảo vệ kính VR của bạn an toàn mọi lúc mọi nơi với lớp vỏ cứng cáp.'
  }
];

// Helper to format currency
export const formatVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const Products = () => {
  const { addToCart, toggleWishlist, isInWishlist, addRecentlyViewed } = useShop();
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Phụ Kiện & Trò Chơi
              </h2>
              <p className="text-gray-600 dark:text-slate-400 max-w-2xl">
                Khám phá trọn bộ hệ sinh thái PlayStation VR2 để nâng tầm trải nghiệm thực tế ảo của bạn.
              </p>
            </div>
            <div className="hidden md:flex gap-3">
              <button 
                onClick={() => scroll('left')}
                className="p-3 rounded-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors shadow-sm"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="p-3 rounded-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors shadow-sm"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="relative -mx-6 px-6">
          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PRODUCTS.map((product, index) => {
              const isFav = isInWishlist(product.id);
              
              return (
                <div
                  key={product.id}
                  className="snap-start shrink-0 w-[280px] sm:w-[320px] group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-slate-800 transition-all duration-300 flex flex-col"
                  onMouseEnter={() => addRecentlyViewed(product)}
                >
                  {/* Image Section */}
                  <div className="relative h-[240px] bg-gray-50/50 dark:bg-slate-800/50 overflow-hidden">
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={() => toggleWishlist(product)}
                        className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
                          isFav 
                          ? 'bg-red-500 text-white shadow-md shadow-red-500/20 scale-110' 
                          : 'bg-white/70 dark:bg-slate-900/70 text-gray-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-800'
                        }`}
                      >
                        <Heart size={18} className={isFav ? "fill-current" : ""} />
                      </button>
                    </div>
                    
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 text-xs font-medium bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-indigo-600 dark:text-indigo-400 rounded-full shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 line-clamp-2 flex-grow">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatVND(product.price)}
                      </span>
                      
                      <button
                        onClick={() => addToCart(product)}
                        className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
