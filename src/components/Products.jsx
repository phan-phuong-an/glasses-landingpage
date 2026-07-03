import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, X, Eye, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';

// Mock data — toàn bộ liên quan đến kính thực tế ảo
const PRODUCTS = [
  {
    id: 'psvr2-headset',
    name: 'PlayStation VR2 Headset',
    price: 14500000,
    category: 'Kính Thực Tế Ảo',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=500&q=80',
    description: 'Trải nghiệm đỉnh cao với màn hình 4K HDR, theo dõi mắt và phản hồi xúc giác.',
    specs: ['OLED 4K HDR', '120Hz', 'Góc nhìn 110°', 'Eye Tracking', 'Haptic Feedback']
  },
  {
    id: 'psvr2-sense-controller',
    name: 'PS VR2 Sense™ Controller',
    price: 2490000,
    category: 'Tay Cầm VR',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=500&q=80',
    description: 'Cảm biến vuốt, phản hồi xúc giác và Trigger thích ứng độc đáo.',
    specs: ['Finger Touch Detection', 'Adaptive Triggers', 'Haptic Feedback', 'Tracking IR']
  },
  {
    id: 'psvr2-charging-station',
    name: 'Trạm Sạc Tay Cầm PS VR2 Sense',
    price: 1290000,
    category: 'Phụ Kiện VR',
    image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=500&q=80',
    description: 'Sạc cùng lúc hai tay cầm nhanh chóng, thiết kế gọn gàng, tinh tế.',
    specs: ['Sạc 2 tay cầm', 'Thiết kế gọn gàng', 'LED báo sạc', 'Tương thích PS VR2']
  },
  {
    id: 'horizon-cotm',
    name: 'Horizon Call of the Mountain',
    price: 1490000,
    category: 'Game VR',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=500&q=80',
    description: 'Khám phá thế giới hùng vĩ qua góc nhìn hoàn toàn mới của Ryas.',
    specs: ['Exclusive PS VR2', 'Đồ họa AAA', 'Eye Tracking', 'Haptic Feedback']
  },
  {
    id: 'resident-evil-village',
    name: 'Resident Evil Village VR',
    price: 1290000,
    category: 'Game VR',
    image: 'https://images.unsplash.com/photo-1577741314755-048d8525d31e?auto=format&fit=crop&w=500&q=80',
    description: 'Đắm chìm vào nỗi sợ hãi tột cùng với chế độ VR kinh dị sinh tồn.',
    specs: ['Chế độ VR toàn phần', 'Góc nhìn thứ nhất', '3D Audio', 'Haptic Feedback']
  },
  {
    id: 'meta-quest-3',
    name: 'Meta Quest 3 — 128GB',
    price: 12990000,
    category: 'Kính Thực Tế Ảo',
    image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=500&q=80',
    description: 'Kính VR độc lập thế hệ mới, Mixed Reality, không cần PC hay dây cáp.',
    specs: ['Snapdragon XR2 Gen 2', 'Mixed Reality', 'Không dây', '2064×2208/mắt', '120Hz']
  },
  {
    id: 'hp-reverb-g2',
    name: 'HP Reverb G2 VR Headset',
    price: 13500000,
    category: 'Kính Thực Tế Ảo',
    image: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&w=500&q=80',
    description: 'Kính VR phân giải cực cao dành cho PC, hợp tác với Valve và Microsoft.',
    specs: ['2160×2160/mắt', '90Hz', 'Valve Speaker', 'Inside-out Tracking', 'WMR']
  },
  {
    id: 'psvr2-carrying-case',
    name: 'Túi Đựng Chống Sốc PSVR2',
    price: 890000,
    category: 'Phụ Kiện VR',
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=500&q=80',
    description: 'Bảo vệ kính VR của bạn an toàn mọi lúc mọi nơi với lớp vỏ cứng cáp.',
    specs: ['Vỏ cứng EVA', 'Chống va đập', 'Ngăn phụ kiện', 'Quai xách tiện lợi']
  }
];

// Helper to format currency
export const formatVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const Products = () => {
  const { addToCart, toggleWishlist, isInWishlist, addRecentlyViewed } = useShop();
  const sliderRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const EXTENDED_PRODUCTS = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS];

  useEffect(() => {
    if (sliderRef.current) {
      // Start at the middle set for infinite scroll effect in both directions
      sliderRef.current.scrollLeft = sliderRef.current.scrollWidth / 3;
    }
  }, []);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    
    const slider = sliderRef.current;
    const cardWidth = slider.children[0].offsetWidth + 24; // 24px is the gap-6
    const thirdWidth = slider.scrollWidth / 3;
    
    if (direction === 'right') {
      // Nhảy ngược lại đoạn giữa nếu đã cuộn tới cuối
      if (slider.scrollLeft >= thirdWidth * 2 - cardWidth) {
        slider.scrollLeft -= thirdWidth;
      }
      setTimeout(() => slider.scrollBy({ left: cardWidth, behavior: 'smooth' }), 10);
    } else {
      // Nhảy tới đoạn giữa nếu đã cuộn về đầu
      if (slider.scrollLeft <= cardWidth) {
        slider.scrollLeft += thirdWidth;
      }
      setTimeout(() => slider.scrollBy({ left: -cardWidth, behavior: 'smooth' }), 10);
    }
  };

  // Khi user click vào sản phẩm → mở popup chi tiết + ghi nhận "đã xem"
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    addRecentlyViewed(product);
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-14">
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

        {/* Slider Container with side arrows */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 z-20 p-2 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500 hover:shadow-lg hover:scale-110 transition-all shadow-md hidden md:flex items-center justify-center"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 z-20 p-2 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500 hover:shadow-lg hover:scale-110 transition-all shadow-md hidden md:flex items-center justify-center"
          >
            <ChevronRight size={20} />
          </button>

          {/* Product Slider */}
          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {EXTENDED_PRODUCTS.map((product, index) => {
              const isFav = isInWishlist(product.id);
              
              return (
                <div
                  key={`${product.id}-${index}`}
                  className="snap-start shrink-0 w-[calc(25%-18px)] min-w-[240px] group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-slate-800 transition-all duration-300 flex flex-col cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  {/* Image Section */}
                  <div className="relative h-[240px] bg-gray-50/50 dark:bg-slate-800/50 overflow-hidden">
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                        className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
                          isFav 
                          ? 'bg-red-500 text-white shadow-md shadow-red-500/20 scale-110' 
                          : 'bg-white/70 dark:bg-slate-900/70 text-gray-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-800'
                        }`}
                      >
                        <Heart size={18} className={isFav ? "fill-current" : ""} />
                      </button>
                    </div>
                    
                    <img loading="lazy" 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Hover overlay — "Xem chi tiết" */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <span className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-slate-900/90 text-gray-900 dark:text-white rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg">
                        <Eye size={16} /> Xem chi tiết
                      </span>
                    </div>
                    
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
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
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

      {/* ===== Product Detail Modal ===== */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[700px] md:max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl z-[90] overflow-hidden flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white rounded-full transition-colors shadow-sm"
              >
                <X size={20} />
              </button>

              {/* Image */}
              <div className="relative h-[280px] md:h-[320px] bg-gray-50 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                <img loading="lazy" 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white rounded-full shadow-md">
                    {selectedProduct.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedProduct.name}
                </h2>

                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={16} className={i <= 4 ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-slate-600"} />
                  ))}
                  <span className="text-sm text-gray-500 dark:text-slate-400 ml-2">(4.0 / 5.0)</span>
                </div>

                <p className="text-gray-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Specs */}
                {selectedProduct.specs && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">Thông số nổi bật</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.specs.map((spec, i) => (
                        <span key={i} className="px-3 py-1.5 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-lg text-sm border border-gray-200 dark:border-slate-700">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price + Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 border-t border-gray-100 dark:border-slate-800">
                  <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {formatVND(selectedProduct.price)}
                  </span>
                  <div className="flex gap-3 w-full sm:w-auto sm:ml-auto">
                    <button
                      onClick={() => toggleWishlist(selectedProduct)}
                      className={`p-3 rounded-xl border transition-all ${
                        isInWishlist(selectedProduct.id) 
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-500' 
                        : 'border-gray-200 dark:border-slate-700 text-gray-400 hover:text-red-500 hover:border-red-300'
                      }`}
                    >
                      <Heart size={20} className={isInWishlist(selectedProduct.id) ? "fill-current" : ""} />
                    </button>
                    <button
                      onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95"
                    >
                      <ShoppingCart size={18} />
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Products;
