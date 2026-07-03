import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import heroImg from "../assets/images/story1.webp";

// Các ngôi sao nhỏ nền tối
const starsData = Array.from({ length: 60 }).map((_, i) => ({
  id: i,
  top: `${(i * 13) % 100}%`,
  left: `${(i * 19) % 100}%`,
  size: ((i * 2) % 2) + 1,
  delay: (i * 0.4) % 4,
}));

const Story = () => {
  const containerRef = useRef(null);

  // Theo dõi tiến độ cuộn trong section này
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring để chuyển động mượt hơn
  const progress = useSpring(scrollYProgress, { stiffness: 50, damping: 18 });

  // ── Kính: từ nhỏ xíu (0.07) → lớn lấp đầy (1.5)
  const glassesScale = useTransform(progress, [0, 0.65], [0.07, 1.6]);
  const glassesFilter = useTransform(
    progress,
    [0, 0.18],
    ["blur(6px)", "blur(0px)"]
  );
  const glassesOpacity = useTransform(
    progress,
    [0, 0.08, 0.88, 1],
    [0, 1, 1, 0.15]
  );

  // ── Tiêu đề section (fades out sớm)
  const titleOpacity = useTransform(progress, [0, 0.08, 0.18], [1, 1, 0]);
  const titleY = useTransform(progress, [0, 0.18], [0, -30]);

  // ── 5 dòng chữ story — mỗi dòng fade in rồi fade out
  // "Bạn đã từng muốn..."
  const p0Opacity = useTransform(progress, [0.18, 0.26, 0.37, 0.44], [0, 1, 1, 0]);
  const p0Y = useTransform(progress, [0.18, 0.26], [24, 0]);

  // "bước vào bộ phim mình yêu thích?"
  const p1Opacity = useTransform(progress, [0.37, 0.45, 0.53, 0.60], [0, 1, 1, 0]);
  const p1Y = useTransform(progress, [0.37, 0.45], [24, 0]);

  // "đứng giữa một sân vận động?"
  const p2Opacity = useTransform(progress, [0.53, 0.61, 0.69, 0.76], [0, 1, 1, 0]);
  const p2Y = useTransform(progress, [0.53, 0.61], [24, 0]);

  // "khám phá sao Hỏa?"
  const p3Opacity = useTransform(progress, [0.69, 0.77, 0.84, 0.89], [0, 1, 1, 0]);
  const p3Y = useTransform(progress, [0.69, 0.77], [24, 0]);

  // Final: "Nova Vision X biến điều đó thành hiện thực."
  const p4Opacity = useTransform(progress, [0.88, 0.96], [0, 1]);
  const p4Y = useTransform(progress, [0.88, 0.96], [30, 0]);
  const p4Scale = useTransform(progress, [0.88, 0.96], [0.92, 1]);

  // Glow vòng tròn phía sau kính — tăng cùng với scale
  const glowOpacity = useTransform(progress, [0, 0.3, 0.7, 1], [0, 0.4, 0.7, 0.2]);
  const glowScale = useTransform(progress, [0, 0.65], [0.1, 3]);

  return (
    // Container cao 600vh để tạo vùng cuộn
    <div ref={containerRef} className="relative h-[600vh]">
      {/* Sticky viewport — luôn chiếm 100vh trong khi cuộn qua phần này */}
      <div className="sticky top-0 h-screen bg-[#04040a] flex items-center justify-center overflow-hidden">

        {/* ── 1. Nền sao ── */}
        <div className="absolute inset-0 pointer-events-none">
          {starsData.map((star) => (
            <span
              key={star.id}
              className="absolute rounded-full bg-white/70 animate-pulse"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                animationDelay: `${star.delay}s`,
                animationDuration: "4s",
              }}
            />
          ))}
        </div>

        {/* ── 2. Glow vòng tròn tím phía sau kính ── */}
        <motion.div
          style={{ opacity: glowOpacity, scale: glowScale }}
          className="absolute w-48 h-48 rounded-full bg-violet-600/30 blur-3xl pointer-events-none"
        />
        <motion.div
          style={{
            opacity: useTransform(glowOpacity, (v) => v * 0.6),
            scale: useTransform(glowScale, (v) => v * 0.7),
          }}
          className="absolute w-40 h-40 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none"
        />

        {/* ── 3. Kính VR — zoom từ xa vào gần ── */}
        <motion.div
          style={{
            scale: glassesScale,
            opacity: glassesOpacity,
            filter: glassesFilter,
          }}
          className="absolute flex items-center justify-center"
        >
          <img loading="lazy"
            src={heroImg}
            alt="VR Headset"
            className="w-[520px] h-auto object-contain select-none drop-shadow-[0_0_60px_rgba(139,92,246,0.6)]"
            draggable={false}
          />
        </motion.div>

        {/* ── 4. Header quote (hiển thị ban đầu, mờ dần khi cuộn) ── */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute top-[18%] left-1/2 -translate-x-1/2 text-center pointer-events-none z-20 w-full px-6"
        >
          <p className="text-indigo-400/70 text-xs tracking-[0.4em] uppercase font-semibold mb-3">
            Khám phá
          </p>
          <h2 className="text-white/90 text-2xl md:text-3xl lg:text-4xl font-bold italic leading-snug">
            Mọi cuộc hành trình vĩ đại đều bắt đầu từ sự tò mò.
          </h2>
          <div className="mt-6 flex flex-col items-center gap-1 text-slate-500 text-xs tracking-widest uppercase">
            <span>Scroll để khám phá</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent"
            />
          </div>
        </motion.div>

        {/* ── 5. Các dòng chữ story ── */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="text-center w-full max-w-2xl px-8 relative">

            {/* Dòng 0 */}
            <motion.p
              style={{ opacity: p0Opacity, y: p0Y }}
              className="absolute inset-x-0 text-slate-300/80 text-2xl md:text-3xl font-light italic"
            >
              Bạn đã từng muốn...
            </motion.p>

            {/* Dòng 1 */}
            <motion.p
              style={{ opacity: p1Opacity, y: p1Y }}
              className="absolute inset-x-0 text-white text-2xl md:text-3xl font-semibold"
            >
              bước vào bộ phim mình yêu thích?
            </motion.p>

            {/* Dòng 2 */}
            <motion.p
              style={{ opacity: p2Opacity, y: p2Y }}
              className="absolute inset-x-0 text-white text-2xl md:text-3xl font-semibold"
            >
              đứng giữa một sân vận động?
            </motion.p>

            {/* Dòng 3 */}
            <motion.p
              style={{ opacity: p3Opacity, y: p3Y }}
              className="absolute inset-x-0 text-white text-2xl md:text-3xl font-semibold"
            >
              khám phá sao Hỏa?
            </motion.p>

            {/* Dòng 4 — Final statement */}
            <motion.p
              style={{ opacity: p4Opacity, y: p4Y, scale: p4Scale }}
              className="absolute inset-x-0 text-2xl md:text-3xl lg:text-4xl font-black leading-tight
                         text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400"
            >
              PlayStation VR sẽ biến điều đó<br />thành hiện thực.
            </motion.p>

          </div>
        </div>

        {/* ── 6. Progress bar cuộn nhỏ ở bên phải ── */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 h-32 w-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleY: progress, originY: 0 }}
            className="w-full h-full bg-gradient-to-b from-indigo-400 to-violet-500 rounded-full"
          />
        </div>

      </div>
    </div>
  );
};

export default Story;
