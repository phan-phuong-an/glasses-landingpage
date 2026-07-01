import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Search, Eye } from 'lucide-react';
import { useShop } from '../context/ShopContext';

// Mock data
const PRODUCTS = [
  {
    id: 'psvr2-headset',
    name: 'PlayStation VR2 Headset',
    price: 14500000,
    category: 'Kính Thực Tế Ảo',
    image: 'https://gmedia.playstation.com/is/image/SIEPDC/psvr2-product-thumbnail-01-en-14sep22?$facebook$',
    description: 'Trải nghiệm đỉnh cao với màn hình 4K HDR, theo dõi mắt và phản hồi xúc giác.'
  },
  {
    id: 'psvr2-sense-controller',
    name: 'PS VR2 Sense™ Controller',
    price: 2490000,
    category: 'Tay Cầm',
    image: 'https://gmedia.playstation.com/is/image/SIEPDC/psvr2-sense-controller-thumbnail-01-en-14sep22?$facebook$',
    description: 'Cảm biến vuốt, phản hồi xúc giác và Trigger thích ứng độc đáo.'
  },
  {
    id: 'psvr2-charging-station',
    name: 'Trạm Sạc Tay Cầm PS VR2 Sense',
    price: 1290000,
    category: 'Phụ Kiện',
    image: 'https://gmedia.playstation.com/is/image/SIEPDC/psvr2-charging-station-thumbnail-01-en-14sep22?$facebook$',
    description: 'Sạc cùng lúc hai tay cầm nhanh chóng, thiết kế gọn gàng, tinh tế.'
  },
  {
    id: 'horizon-cotm',
    name: 'Horizon Call of the Mountain',
    price: 1490000,
    category: 'Game',
    image: 'https://gmedia.playstation.com/is/image/SIEPDC/horizon-call-of-the-mountain-store-art-01-en-26may22?$facebook$',
    description: 'Khám phá thế giới hùng vĩ qua góc nhìn hoàn toàn mới của Ryas.'
  }
];

// Helper to format currency
export const formatVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const Products = () => {
  const { addToCart, toggleWishlist, isInWishlist, addRecentlyViewed } = useShop();

  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Phụ Kiện & Trò Chơi
          </h2>
          <p className="text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            Khám phá trọn bộ hệ sinh thái PlayStation VR2 để nâng tầm trải nghiệm thực tế ảo của bạn.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product, index) => {
            const isFav = isInWishlist(product.id);
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-slate-800 transition-all duration-300 flex flex-col"
                onMouseEnter={() => addRecentlyViewed(product)} // Track recently viewed when hovering/interacting
              >
                {/* Image Section */}
                <div className="relative aspect-square p-6 bg-gray-50/50 dark:bg-slate-800/50 overflow-hidden">
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
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
