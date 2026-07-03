import React, { useRef } from "react";

// Danh sách sao cố định phân bố ngẫu nhiên (Giảm từ 50 xuống 15 để tối ưu hiệu suất CPU Mobile)
const starsData = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  top: `${(i * 17) % 100}%`,
  left: `${(i * 23) % 100}%`,
  size: ((i * 3) % 3) + 1.5,
  delay: (i * 0.7) % 5,
}));

const Hero = ({ onNavigate }) => {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden px-6 md:px-16 lg:px-24 pt-20 transition-colors duration-500 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50 dark:from-[#020617] dark:via-[#070f2b] dark:to-[#020617]"
    >
      {/* Starfield – chỉ rõ khi dark mode */}
      <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-100">
        {starsData.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Nebula glow center-right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none bg-violet-500/10 dark:bg-violet-700/20" />
      <div className="absolute right-1/4 top-1/3 w-[300px] h-[300px] rounded-full blur-[90px] pointer-events-none bg-indigo-400/10 dark:bg-indigo-500/15" />

      {/* ─── Grid layout: text left / image right ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[75vh]">

        {/* ── CỘT TRÁI: Chữ ── */}
        <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start animate-fade-in-left">
          {/* Tiêu đề */}
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white transition-colors duration-500 uppercase">
            Kính thực tế ảo <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600">
              PlayStation VR
            </span>
          </h1>

          {/* Mô tả */}
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md leading-relaxed transition-colors duration-500">
            Là dòng thiết bị chuyên dụng, cho phép đắm chìm vào không gian game 360 độ. Bước vào một thế giới nơi trí tưởng tượng trở thành hiện thực của bạn.
          </p>

          {/* Các nút CTA */}
          <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start mt-2">
            <button
              onClick={() => {
                window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
              }}
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-xl tracking-widest transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 cursor-pointer"
            >
              KHÁM PHÁ
            </button>
            <button
              onClick={() => onNavigate && onNavigate("about")}
              className="px-8 py-3.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold rounded-xl tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              Tìm hiểu thêm →
            </button>
          </div>

          {/* Stats nhỏ */}
          <div className="flex gap-8 mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
            {[
              { value: "360°", label: "Full rotation" },
              { value: "4K", label: "Display" },
              { value: "120Hz", label: "Refresh rate" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CỘT PHẢI: Kính VR xoay chậm + hover nghiêng ── */}
        <div className="flex items-center justify-center relative" style={{ perspective: "1000px" }}>

          {/* Glow vòng tròn phía sau kính */}
          <div className="absolute w-[360px] h-[360px] rounded-full bg-indigo-500/8 dark:bg-violet-600/15 blur-3xl pointer-events-none" />

          {/* Bóng đổ dưới kính */}
          <div className="absolute bottom-8 w-[55%] h-6 bg-black/10 dark:bg-indigo-950/50 rounded-full blur-2xl pointer-events-none animate-float" />

          {/* Kính VR – tự xoay chậm quanh trục Y */}
          <div className="relative w-[320px] md:w-[420px] lg:w-[480px] select-none cursor-pointer animate-float hover:scale-105 transition-transform duration-500">
            <div className="animate-spin-slow" style={{ transformStyle: "preserve-3d" }}>
              <img
                src="/hero.webp"
                alt="VR Glasses"
                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(99,102,241,0.3)] dark:drop-shadow-[0_25px_60px_rgba(139,92,246,0.5)]"
                draggable={false}
                fetchpriority="high"
                width="480"
                height="480"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600 pointer-events-none animate-bounce-y">
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-400 dark:from-slate-600 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
