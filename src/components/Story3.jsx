import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X } from "lucide-react";
import story3Img from "../assets/images/story3.webp";

// Định nghĩa 3 hotspot và thông tin popup
const hotspots = [
  {
    id: "lens",
    label: "Lens",
    icon: "👁️",
    top: "54%",
    left: "50%",
    title: "Lens",
    subtitle: "Dual 4K OLED Display",
    description: "Độ phân giải 4K per eye, 120Hz adaptive refresh rate, pixel density 2000 PPI.",
    accentColor: "amber",
    popupSide: "right",
  },
  {
    id: "speaker",
    label: "Speaker",
    icon: "🔊",
    top: "28%",
    left: "15%",
    title: "Speaker",
    subtitle: "360° Spatial Audio",
    description: "Hệ thống âm thanh 3D vòm 360 độ, mô phỏng âm thanh từ mọi hướng trong không gian.",
    accentColor: "violet",
    popupSide: "right",
  },
  {
    id: "camera",
    label: "Camera",
    icon: "📷",
    top: "82%",
    left: "72%",
    title: "Camera",
    subtitle: "AI Motion Tracking",
    description: "Camera AI theo dõi chuyển động chính xác đến từng milimet, phản hồi dưới 1ms.",
    accentColor: "blue",
    popupSide: "left",
  },
];

// Map màu accent sang Tailwind class
const accentMap = {
  amber: {
    ring: "ring-amber-400/70",
    glow: "shadow-[0_0_20px_rgba(251,191,36,0.7)]",
    dot: "bg-amber-400",
    pulse: "bg-amber-400/30",
    border: "border-amber-400/30",
    text: "text-amber-300",
    pin: "text-pink-400",
  },
  violet: {
    ring: "ring-violet-400/70",
    glow: "shadow-[0_0_20px_rgba(167,139,250,0.6)]",
    dot: "bg-violet-400",
    pulse: "bg-violet-400/30",
    border: "border-violet-400/30",
    text: "text-violet-300",
    pin: "text-pink-400",
  },
  blue: {
    ring: "ring-blue-400/70",
    glow: "shadow-[0_0_20px_rgba(96,165,250,0.6)]",
    dot: "bg-blue-400",
    pulse: "bg-blue-400/30",
    border: "border-blue-400/30",
    text: "text-blue-300",
    pin: "text-pink-400",
  },
};

const PopupPanel = ({ hotspot, onClose }) => {
  const accent = accentMap[hotspot.accentColor];
  const isLeft = hotspot.popupSide === "left";

  return (
    <motion.div
      key={hotspot.id + "-popup"}
      initial={{ opacity: 0, scale: 0.88, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`absolute z-50 w-56 rounded-2xl border ${accent.border}
        bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden
        ${isLeft ? "right-[calc(100%+16px)]" : "left-[calc(100%+16px)]"}
        top-1/2 -translate-y-1/2`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Gradient top bar */}
      <div
        className={`h-0.5 w-full bg-gradient-to-r from-transparent to-transparent via-${
          hotspot.accentColor === "amber"
            ? "amber"
            : hotspot.accentColor === "violet"
            ? "violet"
            : "blue"
        }-400`}
      />

      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-pink-400 text-sm">📍</span>
            <span className="text-white font-bold text-sm tracking-wide">{hotspot.title}</span>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white/80 transition-colors p-0.5 rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subtitle */}
        <p className={`${accent.text} text-xs font-semibold tracking-wider uppercase`}>
          {hotspot.subtitle}
        </p>

        {/* Description */}
        <p className="text-slate-300/80 text-xs leading-relaxed">{hotspot.description}</p>

        {/* Visual indicator */}
        <div className="w-full h-12 rounded-lg bg-slate-900/60 border border-white/5 flex items-center justify-center overflow-hidden">
          {hotspot.id === "lens" && (
            <div className="flex gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  {[...Array(4)].map((_, j) => (
                    <div
                      key={j}
                      className="w-1.5 h-1"
                      style={{
                        backgroundColor: `hsl(${(i * 30 + j * 15) % 360}, 80%, 60%)`,
                        opacity: 0.85,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
          {hotspot.id === "speaker" && (
            <div className="flex items-end gap-0.5 h-7">
              {[3, 6, 9, 7, 11, 8, 5, 10, 6, 4].map((h, i) => (
                <div
                  key={i}
                  className="w-1 rounded-sm bg-gradient-to-t from-violet-500 to-violet-300"
                  style={{ height: `${h * 3}px`, opacity: 0.8 }}
                />
              ))}
            </div>
          )}
          {hotspot.id === "camera" && (
            <div className="relative w-10 h-10 rounded-full border-2 border-blue-400/40 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border border-blue-300/60 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
              </div>
              <div className="absolute inset-0 rounded-full animate-ping bg-blue-400/10" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Story3 = () => {
  const sectionRef = useRef(null);
  const imgWrapperRef = useRef(null);
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Raw mouse position values normalised to [-0.5, 0.5]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring — adjust stiffness/damping for feel
  const springX = useSpring(mouseX, { stiffness: 60, damping: 14 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 14 });

  // Map to rotation degrees: ±15° horizontal, ±10° vertical
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);

  // Subtle translation for depth parallax
  const translateX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleHotspotClick = (id) => {
    setActiveHotspot((prev) => (prev === id ? null : id));
  };

  const handleBackdropClick = () => {
    setActiveHotspot(null);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#02020a] flex flex-col items-center justify-center overflow-hidden px-4 py-16"
      onClick={handleBackdropClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Nền: subtle radial gradient ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,_rgba(88,28,235,0.12)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,_rgba(29,78,216,0.08)_0%,_transparent_50%)]" />
      </div>



      {/* ── Tiêu đề section ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 text-center mb-6 md:mb-10"
      >
        <p className="text-indigo-400/60 text-xs tracking-[0.4em] uppercase font-semibold mb-3">
          Khám phá chi tiết
        </p>
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
          Kiến Trúc{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-indigo-400">
            Hoàn Hảo
          </span>
        </h2>
        <p className="text-slate-500 text-sm mt-3 tracking-wide">
          Di chuyển chuột · Bấm vào điểm sáng để khám phá
        </p>
      </motion.div>

      {/* ── Khung ảnh kính 3D + Hotspots ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
        ref={imgWrapperRef}
        className="relative z-10 w-full max-w-2xl aspect-square flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        {/* Glow vòng tròn phía sau kính — follows mouse subtly */}
        <motion.div
          style={{ x: translateX, y: translateY }}
          className="absolute inset-[10%] rounded-full bg-violet-600/12 blur-3xl pointer-events-none"
        />
        <motion.div
          style={{ x: useTransform(springX, [-0.5, 0.5], [-6, 6]), y: useTransform(springY, [-0.5, 0.5], [-4, 4]) }}
          className="absolute inset-[20%] rounded-full bg-blue-600/10 blur-2xl pointer-events-none"
        />

        {/* Ảnh kính VR quay theo chuột — 3D perspective tilt */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            x: translateX,
            y: translateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <img loading="lazy"
            src={story3Img}
            alt="PlayStation VR - Chi tiết kỹ thuật"
            className="w-full h-full object-contain mix-blend-screen select-none pointer-events-none
              drop-shadow-[0_0_80px_rgba(99,102,241,0.45)]"
            draggable={false}
          />

          {/* ── Hotspots (mounted inside the rotating group so they follow) ── */}
          {hotspots.map((hs) => {
            const isActive = activeHotspot === hs.id;
            const accent = accentMap[hs.accentColor];

            return (
              <div
                key={hs.id}
                className="absolute"
                style={{ top: hs.top, left: hs.left, transform: "translate(-50%, -50%)" }}
              >
                {/* Pulse ring */}
                {!isActive && (
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute inset-0 -m-3 rounded-full ${accent.pulse}`}
                  />
                )}

                {/* Hotspot button */}
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHotspotClick(hs.id);
                  }}
                  className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center
                    cursor-pointer transition-all duration-300 z-20
                    ${
                      isActive
                        ? `${accent.dot} border-white/80 ring-4 ${accent.ring} ${accent.glow}`
                        : "bg-white/10 border-white/40 hover:bg-white/20 hover:border-white/70 backdrop-blur-sm"
                    }`}
                >
                  <div className={`w-2 h-2 rounded-full ${isActive ? "bg-white" : "bg-white/70"}`} />
                </motion.button>

                {/* Popup panel */}
                <AnimatePresence>
                  {isActive && (
                    <PopupPanel hotspot={hs} onClose={() => setActiveHotspot(null)} />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* ── Dòng tính năng ghosted ở cuối ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        className="relative z-10 mt-4 md:mt-8 flex flex-col items-center gap-5 w-full max-w-2xl"
      >
        {/* Hai mục ghosted */}
        <div className="flex gap-8 md:gap-16 justify-center">
          {/* Speaker */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleHotspotClick("speaker");
            }}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="flex items-center gap-2 text-slate-500/70 group-hover:text-violet-400 transition-colors duration-300">
              <span className="text-pink-400/60 text-xs">📍</span>
              <span className="text-xs font-semibold tracking-wider uppercase">Speaker</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600/60 group-hover:text-slate-400 transition-colors duration-300">
              <span className="text-slate-500 text-xs">→</span>
              <span className="text-xs tracking-wide">360° Spatial Audio</span>
            </div>
          </button>

          {/* Camera */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleHotspotClick("camera");
            }}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="flex items-center gap-2 text-slate-500/70 group-hover:text-blue-400 transition-colors duration-300">
              <span className="text-pink-400/60 text-xs">📍</span>
              <span className="text-xs font-semibold tracking-wider uppercase">Camera</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600/60 group-hover:text-slate-400 transition-colors duration-300">
              <span className="text-slate-500 text-xs">→</span>
              <span className="text-xs tracking-wide">AI Motion Tracking</span>
            </div>
          </button>
        </div>

        {/* Chỉ dẫn khám phá */}
        <motion.div
          animate={{ y: [0, 4, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 text-slate-600"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Bấm để khám phá thêm</span>
          <div className="w-px h-5 bg-gradient-to-b from-slate-600 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Story3;
