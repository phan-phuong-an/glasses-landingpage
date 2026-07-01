import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Monitor, Zap, Eye, Cable } from "lucide-react";

// ===================== DATA =====================
const stats = [
  {
    id: "display",
    target: 4,
    suffix: "K HDR",
    suffixStyle: "text-2xl md:text-3xl font-bold text-blue-300 ml-1",
    title: "Màn hình siêu nét",
    description: "Hai màn hình OLED 2000×2040 mang lại hình ảnh chi tiết đáng kinh ngạc.",
    icon: Monitor,
    accentColor: "#3b82f6",
    glowColor: "rgba(59,130,246,0.35)",
    duration: 0.8,   // Nhảy nhanh rồi dừng
    size: "large",   // Card lớn (chiếm 2 cột)
  },
  {
    id: "refresh",
    target: 120,
    suffix: "Hz",
    suffixStyle: "text-2xl md:text-3xl font-bold text-purple-300 ml-1",
    title: "Khung hình mượt mà",
    description: "Tần số quét cao giúp chuyển động trong game vô cùng trơn tru, giảm chóng mặt.",
    icon: Zap,
    accentColor: "#a855f7",
    glowColor: "rgba(168,85,247,0.35)",
    duration: 1.5,   // Nhảy xẹt xẹt 1.5 giây
    size: "normal",
  },
  {
    id: "fov",
    target: 110,
    suffix: "°",
    suffixStyle: "text-2xl md:text-3xl font-bold text-sky-300 ml-0.5",
    title: "Góc nhìn rộng",
    description: "Field of View mở rộng, bao quát toàn bộ thế giới ảo quanh bạn.",
    icon: Eye,
    accentColor: "#0ea5e9",
    glowColor: "rgba(14,165,233,0.35)",
    duration: 1.2,
    size: "normal",
  },
  {
    id: "cable",
    target: 1,
    suffix: " Cáp",
    suffixStyle: "text-2xl md:text-3xl font-bold text-indigo-300 ml-1",
    title: "Kết nối đơn giản",
    description: "Thiết lập ngay lập tức chỉ với một sợi cáp USB-C duy nhất cắm vào PS5.",
    icon: Cable,
    accentColor: "#6366f1",
    glowColor: "rgba(99,102,241,0.35)",
    duration: 0.6,   // Nhảy rất nhanh, 0 → 1 ngay
    size: "large",   // Card lớn
  },
];

// ===================== PARTICLE BACKGROUND =====================
const ParticleBg = () => {
  const particles = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 6 + 5,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.05,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 2.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// ===================== ANIMATED NUMBER =====================
const AnimatedNumber = ({ target, duration, isActive }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [suffixVisible, setSuffixVisible] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    setSuffixVisible(false);
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(Math.floor(v)),
      onComplete: () => setSuffixVisible(true),
    });
    return () => controls.stop();
  }, [isActive, target, duration]);

  return { displayValue, suffixVisible };
};

// ===================== STAT CARD =====================
const StatCard = ({ stat, isActive }) => {
  const { displayValue, suffixVisible } = AnimatedNumber({
    target: stat.target,
    duration: stat.duration,
    isActive,
  });

  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative rounded-2xl overflow-hidden cursor-default select-none"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      whileHover={{
        borderColor: stat.accentColor,
        boxShadow: `0 0 32px ${stat.glowColor}, inset 0 0 32px rgba(255,255,255,0.02)`,
        scale: 1.02,
        transition: { duration: 0.25 },
      }}
    >
      {/* Neon top-border line khi hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.accentColor}, transparent)` }}
      />

      {/* Radial glow corner khi hover */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500"
        style={{ background: stat.accentColor }}
      />

      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between min-h-[190px]">
        {/* Top row: số lớn + icon */}
        <div className="flex items-start justify-between">
          {/* Con số CỰC LỚN */}
          <div className="flex items-end leading-none">
            <span
              className="font-black tracking-tighter text-white"
              style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)", lineHeight: 1 }}
            >
              {displayValue}
            </span>
            <motion.span
              className={stat.suffixStyle}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: suffixVisible ? 1 : 0, y: suffixVisible ? 0 : 4 }}
              transition={{ duration: 0.4 }}
            >
              {stat.suffix}
            </motion.span>
          </div>

          {/* Icon mờ phía góc phải */}
          <div
            className="opacity-20 group-hover:opacity-60 transition-opacity duration-300 mt-1"
            style={{ color: stat.accentColor }}
          >
            <Icon className="w-8 h-8 md:w-10 md:h-10" />
          </div>
        </div>

        {/* Bottom: tiêu đề + mô tả */}
        <div>
          <h3
            className="text-white font-bold text-lg md:text-xl mb-2 group-hover:text-opacity-100"
            style={{ color: "rgba(255,255,255,0.95)" }}
          >
            {stat.title}
          </h3>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
            {stat.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ===================== STORY 5 =====================
const Story5 = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 overflow-hidden"
      style={{ background: "#0f0f0f" }}
    >
      {/* Particle background */}
      <ParticleBg />

      {/* Subtle radial spotlight behind bento grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* ---- Section Header ---- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-bold tracking-[0.35em] uppercase mb-4">
            Thông Số Kỹ Thuật
          </p>
          <h2 className="text-white font-black text-4xl md:text-6xl lg:text-7xl tracking-tight leading-tight">
            Sức Mạnh{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Vượt Giới Hạn.
            </span>
          </h2>
          <p className="text-slate-400 mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Mỗi thông số là một tuyên ngôn. PlayStation VR2 không thỏa hiệp.
          </p>
        </motion.div>

        {/* ---- Bento Grid ---- */}
        {/*
          Layout desktop:
          [ Card 1 (4K)  large ] [ Card 2 (120Hz) ]
          [ Card 3 (110°)      ] [ Card 4 (1 Cáp) large ]
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {/* Card 1: 4K – chiếm 2 cột trên desktop */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <StatCard stat={stats[0]} isActive={isInView} />
          </motion.div>

          {/* Card 2: 120Hz */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <StatCard stat={stats[1]} isActive={isInView} />
          </motion.div>

          {/* Card 3: 110° */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3 }}
          >
            <StatCard stat={stats[2]} isActive={isInView} />
          </motion.div>

          {/* Card 4: 1 Cáp – chiếm 2 cột trên desktop */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.4 }}
          >
            <StatCard stat={stats[3]} isActive={isInView} />
          </motion.div>
        </div>

        {/* ---- Bottom badge ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-14 flex justify-center"
        >
          <div
            className="flex items-center gap-3 px-6 py-3 rounded-full text-sm text-slate-400 font-medium tracking-wider"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            PlayStation VR2 — Powered by PS5
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Story5;
