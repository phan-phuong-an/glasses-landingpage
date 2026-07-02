import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, Heart, Star, SlidersHorizontal, Search,
  ChevronDown, Flame, Tag, Headset, Wrench, ArrowUpDown, X
} from "lucide-react";
import { Gamepad2 } from "lucide-react";
import { useShop } from "../context/ShopContext";

// ─── Ảnh import cho sản phẩm ProductPage ───
import psvrStandard from "../assets/images/prod_psvr2_standard.png";
import psvrGoW from "../assets/images/prod_psvr2_gow.png";
import metaQuest3 from "../assets/images/prod_meta_quest3.png";
import psvrHorizon from "../assets/images/prod_psvr2_horizon.png";
import senseController from "../assets/images/prod_sense_controller.png";
import chargingDock from "../assets/images/prod_charging.png";
import lensProtector from "../assets/images/prod_lens.png";
import fallback1 from "../assets/images/about_collage2.png";
import fallback2 from "../assets/images/about_feature.png";

// ─── Dữ liệu sản phẩm ───
const ALL_PRODUCTS = [
  // ── VR Glasses (từ ProductPage) ──
  {
    id: "vr-1",
    name: "Bộ kính PlayStation VR2",
    category: "vr",
    price: 12990000,
    originalPrice: null,
    rating: 4.9,
    reviews: 2341,
    isFavorite: true,
    isSale: false,
    badge: "Bán chạy",
    img: psvrStandard,
    desc: "Màn hình OLED 4K, 110° FOV, eye tracking, haptic feedback toàn thân",
    specs: ["OLED 4K HDR", "120Hz", "Góc nhìn 110°", "Eye Tracking", "Haptic Feedback"],
  },
  {
    id: "vr-2",
    name: "Bộ kính PSVR2 – Horizon Bundle",
    category: "vr",
    price: 14890000,
    originalPrice: 16990000,
    rating: 4.8,
    reviews: 1872,
    isFavorite: true,
    isSale: true,
    badge: "Sale -12%",
    img: psvrHorizon,
    desc: "Trọn bộ PSVR2 kèm game Horizon: Call of the Mountain bản full",
    specs: ["OLED 4K HDR", "Kèm game Horizon", "Eye Tracking", "Haptic Feedback"],
  },
  {
    id: "vr-3",
    name: "Bộ kính PSVR2 – God of War Bundle",
    category: "vr",
    price: 15490000,
    originalPrice: 18490000,
    rating: 4.9,
    reviews: 987,
    isFavorite: false,
    isSale: true,
    badge: "Sale -16%",
    img: psvrGoW,
    desc: "Trọn bộ PSVR2 kèm game God of War: Ragnarök VR Edition",
    specs: ["OLED 4K HDR", "Kèm game God of War", "Adaptive Triggers", "Haptic Feedback"],
  },
  {
    id: "vr-4",
    name: "Meta Quest 3 128GB",
    category: "vr",
    price: 13490000,
    originalPrice: null,
    rating: 4.7,
    reviews: 3210,
    isFavorite: true,
    isSale: false,
    badge: "Độc lập",
    img: metaQuest3,
    desc: "Standalone VR không cần PC hay console, chip Snapdragon XR2 Gen 2",
    specs: ["Snapdragon XR2 Gen 2", "Mixed Reality", "Không dây", "2064×2208/mắt", "120Hz"],
  },
  {
    id: "vr-5",
    name: "Meta Quest 3 512GB",
    category: "vr",
    price: 16490000,
    originalPrice: 17990000,
    rating: 4.8,
    reviews: 1543,
    isFavorite: false,
    isSale: true,
    badge: "Sale -8%",
    img: fallback1,
    desc: "Phiên bản dung lượng cao với toàn bộ tính năng của Meta Quest 3",
    specs: ["512GB Storage", "Snapdragon XR2 Gen 2", "Mixed Reality", "120Hz"],
  },
  {
    id: "vr-6",
    name: "Meta Quest 2 128GB",
    category: "vr",
    price: 6990000,
    originalPrice: 8500000,
    rating: 4.8,
    reviews: 8902,
    isFavorite: false,
    isSale: true,
    badge: "Quốc dân",
    img: fallback2,
    desc: "Kính thực tế ảo quốc dân, giá thành tiếp cận, trải nghiệm chơi game không cần PC.",
    specs: ["Snapdragon XR2", "Độc lập không dây", "1832×1920/mắt", "90Hz", "Gọn nhẹ"],
  },

  // ── VR Glasses (từ trang Home) ──
  {
    id: "psvr2-headset",
    name: "PlayStation VR2 Headset",
    category: "vr",
    price: 14500000,
    originalPrice: null,
    rating: 4.9,
    reviews: 2890,
    isFavorite: true,
    isSale: false,
    badge: "Bán chạy",
    img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=500&q=80",
    desc: "Trải nghiệm đỉnh cao với màn hình 4K HDR, theo dõi mắt và phản hồi xúc giác.",
    specs: ["OLED 4K HDR", "120Hz", "Góc nhìn 110°", "Eye Tracking", "Haptic Feedback"],
  },
  {
    id: "meta-quest-3",
    name: "Meta Quest 3 — 128GB",
    category: "vr",
    price: 12990000,
    originalPrice: null,
    rating: 4.7,
    reviews: 3456,
    isFavorite: true,
    isSale: false,
    badge: "Độc lập",
    img: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=500&q=80",
    desc: "Kính VR độc lập thế hệ mới, Mixed Reality, không cần PC hay dây cáp.",
    specs: ["Snapdragon XR2 Gen 2", "Mixed Reality", "Không dây", "2064×2208/mắt", "120Hz"],
  },
  {
    id: "hp-reverb-g2",
    name: "HP Reverb G2 VR Headset",
    category: "vr",
    price: 13500000,
    originalPrice: 15000000,
    rating: 4.5,
    reviews: 1230,
    isFavorite: false,
    isSale: true,
    badge: "Sale -10%",
    img: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&w=500&q=80",
    desc: "Kính VR phân giải cực cao dành cho PC, hợp tác với Valve và Microsoft.",
    specs: ["2160×2160/mắt", "90Hz", "Valve Speaker", "Inside-out Tracking", "WMR"],
  },

  // ── Accessories (từ trang Home) ──
  {
    id: "psvr2-sense-controller",
    name: "PS VR2 Sense Controller – Cặp đôi",
    category: "accessory",
    price: 2490000,
    originalPrice: null,
    rating: 4.9,
    reviews: 4120,
    isFavorite: true,
    isSale: false,
    badge: "Best Seller",
    img: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=500&q=80",
    desc: "Cảm biến vuốt, phản hồi xúc giác và Trigger thích ứng độc đáo.",
    specs: ["Finger Touch Detection", "Adaptive Triggers", "Haptic Feedback", "Tracking IR"],
  },
  {
    id: "psvr2-charging-station",
    name: "Trạm Sạc Tay Cầm PS VR2 Sense",
    category: "accessory",
    price: 1290000,
    originalPrice: 1490000,
    rating: 4.7,
    reviews: 2340,
    isFavorite: false,
    isSale: true,
    badge: "Sale -13%",
    img: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=500&q=80",
    desc: "Sạc cùng lúc hai tay cầm nhanh chóng, thiết kế gọn gàng, tinh tế.",
    specs: ["Sạc 2 tay cầm", "Thiết kế gọn gàng", "LED báo sạc", "Tương thích PS VR2"],
  },
  {
    id: "psvr2-carrying-case",
    name: "Túi Đựng Chống Sốc PSVR2",
    category: "accessory",
    price: 890000,
    originalPrice: null,
    rating: 4.5,
    reviews: 1876,
    isFavorite: false,
    isSale: false,
    badge: "Bảo vệ",
    img: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=500&q=80",
    desc: "Bảo vệ kính VR của bạn an toàn mọi lúc mọi nơi với lớp vỏ cứng cáp.",
    specs: ["Vỏ cứng EVA", "Chống va đập", "Ngăn phụ kiện", "Quai xách tiện lợi"],
  },

  // ── Accessories (từ ProductPage) ──
  {
    id: "acc-1",
    name: "Cần điều khiển Sense – Cặp đôi",
    category: "accessory",
    price: 3490000,
    originalPrice: 3990000,
    rating: 4.9,
    reviews: 2890,
    isFavorite: true,
    isSale: true,
    badge: "Sale -13%",
    img: senseController,
    desc: "Tay cầm VR Sense hỗ trợ haptic feedback và adaptive trigger chính hãng Sony",
    specs: ["Haptic Feedback", "Adaptive Triggers", "Finger Touch", "Tracking IR"],
  },
  {
    id: "acc-2",
    name: "Đế sạc tay cầm Sense Duo",
    category: "accessory",
    price: 1290000,
    originalPrice: 1590000,
    rating: 4.7,
    reviews: 1234,
    isFavorite: false,
    isSale: true,
    badge: "Sale -19%",
    img: chargingDock,
    desc: "Sạc đồng thời 2 tay cầm Sense, đèn LED báo mức pin trực quan",
    specs: ["Sạc 2 tay cầm", "LED indicator", "Tương thích PS VR2"],
  },
  {
    id: "acc-3",
    name: "Miếng bảo vệ lens chống trầy",
    category: "accessory",
    price: 390000,
    originalPrice: null,
    rating: 4.5,
    reviews: 3456,
    isFavorite: true,
    isSale: false,
    badge: "Bảo vệ",
    img: lensProtector,
    desc: "Bộ 3 miếng dán lens silicon, chống trầy và bụi bẩn hiệu quả",
    specs: ["Bộ 3 miếng", "Silicon mềm", "Chống trầy", "Dễ tháo lắp"],
  },
  {
    id: "acc-4",
    name: "Dây đeo đầu Elite Comfort",
    category: "accessory",
    price: 890000,
    originalPrice: 1190000,
    rating: 4.6,
    reviews: 2167,
    isFavorite: false,
    isSale: true,
    badge: "Sale -25%",
    img: senseController,
    desc: "Dây đeo êm ái có đệm foam memory, điều chỉnh theo đầu, giảm mỏi cổ",
    specs: ["Memory Foam", "Điều chỉnh kích cỡ", "Giảm áp lực"],
  },

  // ── Game VR (từ trang Home) ──
  {
    id: "horizon-cotm",
    name: "Horizon Call of the Mountain",
    category: "game",
    price: 1490000,
    originalPrice: null,
    rating: 4.9,
    reviews: 5670,
    isFavorite: true,
    isSale: false,
    badge: "Độc quyền VR",
    img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=500&q=80",
    desc: "Khám phá thế giới hùng vĩ qua góc nhìn hoàn toàn mới của Ryas.",
    specs: ["Exclusive PS VR2", "Đồ họa AAA", "Eye Tracking", "Haptic Feedback"],
  },
  {
    id: "resident-evil-village",
    name: "Resident Evil Village VR Mode",
    category: "game",
    price: 1290000,
    originalPrice: 1590000,
    rating: 4.8,
    reviews: 4231,
    isFavorite: false,
    isSale: true,
    badge: "Sale -19%",
    img: "https://images.unsplash.com/photo-1577741314755-048d8525d31e?auto=format&fit=crop&w=500&q=80",
    desc: "Đắm chìm vào nỗi sợ hãi tột cùng với chế độ VR kinh dị sinh tồn.",
    specs: ["Chế độ VR toàn phần", "Góc nhìn thứ nhất", "3D Audio", "Haptic Feedback"],
  },
  {
    id: "gran-turismo-7-vr",
    name: "Gran Turismo 7 VR Edition",
    category: "game",
    price: 1690000,
    originalPrice: null,
    rating: 4.9,
    reviews: 6102,
    isFavorite: true,
    isSale: false,
    badge: "Siêu phẩm",
    img: "https://images.unsplash.com/photo-1547941126-3d5322b218b0?auto=format&fit=crop&w=500&q=80",
    desc: "Trải nghiệm đua xe thực tế ảo chân thực nhất với hơn 400 mẫu xe chi tiết.",
    specs: ["Hỗ trợ PS VR2", "Showroom VR", "Haptic Feedback", "Đồ họa 4K HDR"],
  },
  {
    id: "psvr2-pc-adapter",
    name: "Bộ chuyển đổi PS VR2 cho PC",
    category: "accessory",
    price: 1490000,
    originalPrice: null,
    rating: 4.8,
    reviews: 1250,
    isFavorite: false,
    isSale: false,
    badge: "Mới",
    img: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=500&q=80",
    desc: "Kết nối kính PS VR2 với PC để chơi thư viện game SteamVR khổng lồ.",
    specs: ["Kết nối PC", "Hỗ trợ SteamVR", "DisplayPort 1.4", "Cắm là chạy"],
  },
];

// ─── Định nghĩa categories ───
const CATEGORIES = [
  { key: "all",       label: "Tất cả",          icon: Headset  },
  { key: "vr",        label: "Kính thực tế ảo",  icon: Headset  },
  { key: "favorite",  label: "Được yêu thích",    icon: Flame    },
  { key: "sale",      label: "Đang sale",          icon: Tag      },
  { key: "game",      label: "Game VR",            icon: Gamepad2 },
  { key: "accessory", label: "Phụ kiện",           icon: Wrench   },
];

// ─── Định nghĩa price ranges ───
const PRICE_RANGES = [
  { label: "Tất cả giá",        min: 0,        max: Infinity  },
  { label: "Dưới 1 triệu",      min: 0,        max: 999999    },
  { label: "1 – 5 triệu",       min: 1000000,  max: 5000000   },
  { label: "5 – 10 triệu",      min: 5000000,  max: 10000000  },
  { label: "10 – 15 triệu",     min: 10000000, max: 15000000  },
  { label: "Trên 15 triệu",     min: 15000000, max: Infinity  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

// ─── Product Card ───
const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const inWishlist = isInWishlist(product.id);

  return (
    <div

      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
    >
      {/* Badge */}
      {product.badge && (
        <div
          className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold text-white tracking-wide"
          style={{
            background: product.isSale
              ? "linear-gradient(135deg, #ef4444, #dc2626)"
              : product.isFavorite
              ? "linear-gradient(135deg, #f59e0b, #d97706)"
              : "linear-gradient(135deg, #4f46e5, #7c3aed)",
          }}
        >
          {product.badge}
        </div>
      )}

      {/* Wishlist button */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
        style={{
          background: inWishlist ? "rgba(239,68,68,0.2)" : "rgba(0,0,0,0.4)",
          backdropFilter: "blur(8px)",
          border: `1px solid ${inWishlist ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
        }}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${inWishlist ? "text-red-400 fill-current" : "text-white/60"}`}
        />
      </button>

      {/* Product image */}
      <div
        className="relative overflow-hidden h-52 flex items-center justify-center p-4"
        style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.08), rgba(139,92,246,0.05))" }}
      >
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 to-transparent" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        <div className="flex-1">
          <p className="text-xs text-indigo-400 font-medium mb-1 uppercase tracking-wide">
            {product.category === "vr" ? "Kính VR" : "Phụ kiện"}
          </p>
          <h3 className="text-white font-bold text-sm leading-snug mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{product.desc}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-amber-400 fill-current" : "text-slate-700"}`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400">{product.rating} ({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2">
          <span className="text-lg font-black text-white">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-slate-600 line-through mb-0.5">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart({ ...product })}
          className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 4px 12px rgba(79,70,229,0.3)" }}
        >
          <ShoppingCart className="w-4 h-4" />
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

// ─── Main ProductPage Component ───
const ProductPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePriceRange, setActivePriceRange] = useState(0);
  const [sortOrder, setSortOrder] = useState("az");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    const priceRange = PRICE_RANGES[activePriceRange];

    let result = ALL_PRODUCTS.filter((p) => {
      // Category filter
      if (activeCategory === "favorite") return p.isFavorite;
      if (activeCategory === "sale") return p.isSale;
      if (activeCategory !== "all") return p.category === activeCategory;
      return true;
    })
      .filter((p) => p.price >= priceRange.min && p.price <= priceRange.max)
      .filter((p) =>
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Sort
    if (sortOrder === "az") result.sort((a, b) => a.name.localeCompare(b.name, "vi"));
    if (sortOrder === "za") result.sort((a, b) => b.name.localeCompare(a.name, "vi"));
    if (sortOrder === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortOrder === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortOrder === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [activeCategory, activePriceRange, sortOrder, searchQuery]);

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* ── Page Header ── */}
      <section className="relative pt-28 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
            style={{ background: "radial-gradient(circle, #4f46e5, transparent)" }} />
          <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-15"
            style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-2"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-indigo-300 mb-4"
              style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)" }}
            >
              <Headset className="w-3.5 h-3.5" />
              Bộ sưu tập LenOVR
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-3">
              Cửa hàng{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(90deg, #818cf8, #a78bfa, #f0abfc)" }}
              >
                Sản phẩm
              </span>
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto">
              Khám phá bộ sưu tập kính VR và phụ kiện chính hãng tại LenOVR — giao hàng nhanh, bảo hành tận nơi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Filters & Controls ── */}
      <div className="sticky top-16 z-30 px-6 py-3" style={{ background: "rgba(2,6,23,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          {/* Row 1: Search + Sort + Filter toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:ring-1 focus:ring-indigo-500"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="pl-8 pr-8 py-2 rounded-xl text-sm text-white outline-none appearance-none cursor-pointer focus:ring-1 focus:ring-indigo-500"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <option value="az" style={{ background: "#0f172a" }}>Tên A → Z</option>
                <option value="za" style={{ background: "#0f172a" }}>Tên Z → A</option>
                <option value="price-asc" style={{ background: "#0f172a" }}>Giá thấp → cao</option>
                <option value="price-desc" style={{ background: "#0f172a" }}>Giá cao → thấp</option>
                <option value="rating" style={{ background: "#0f172a" }}>Đánh giá cao nhất</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            </div>

            {/* Filter toggle (mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: showFilters ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${showFilters ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: showFilters ? "#a5b4fc" : "#94a3b8",
              }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Bộ lọc giá</span>
            </button>

            {/* Result count */}
            <span className="text-slate-500 text-sm ml-auto hidden sm:block">
              {filteredProducts.length} sản phẩm
            </span>
          </div>

          {/* Row 2: Category tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  background: activeCategory === cat.key ? "linear-gradient(135deg, #4f46e5, #7c3aed)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${activeCategory === cat.key ? "transparent" : "rgba(255,255,255,0.08)"}`,
                  color: activeCategory === cat.key ? "white" : "#94a3b8",
                  boxShadow: activeCategory === cat.key ? "0 4px 12px rgba(79,70,229,0.4)" : "none",
                }}
              >
                <cat.icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Price range (expandable) */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 flex-wrap overflow-hidden"
              >
                <span className="text-xs text-slate-500 font-medium">Phân khúc giá:</span>
                {PRICE_RANGES.map((range, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePriceRange(i)}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: activePriceRange === i ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${activePriceRange === i ? "rgba(99,102,241,0.6)" : "rgba(255,255,255,0.08)"}`,
                      color: activePriceRange === i ? "#a5b4fc" : "#64748b",
                    }}
                  >
                    {range.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <main className="max-w-7xl mx-auto px-6 py-10">
          {filteredProducts.length > 0 ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-white font-bold text-xl mb-2">Không tìm thấy sản phẩm</h3>
              <p className="text-slate-500 text-sm">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác.</p>
              <button
                onClick={() => { setActiveCategory("all"); setActivePriceRange(0); setSearchQuery(""); }}
                className="mt-6 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
      </main>
    </div>
  );
};

export default ProductPage;
