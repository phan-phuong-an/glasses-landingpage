import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Eye, Volume2, Gamepad2 } from "lucide-react";
import story2Img from "../assets/images/story2.png";

// Danh sách sao cho nền
const starsData = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  top: `${(i * 19) % 100}%`,
  left: `${(i * 13) % 100}%`,
  size: ((i * 3) % 2) + 1,
  delay: (i * 0.5) % 4,
}));

const Story2 = () => {
  const containerRef = useRef(null);

  // Theo dõi tiến độ cuộn trong section Story 2
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Spring để hiệu ứng chuyển động mượt mà hơn
  const progress = useSpring(scrollYProgress, { stiffness: 55, damping: 20 });

  // ── 1. Màu nền: Chuyển dần từ màu đen sâu (#04040a) sang xanh tím huyền ảo (#0a0a23)
  const backgroundStyle = useTransform(
    progress,
    [0, 0.4],
    [
      "radial-gradient(circle at 50% 50%, #04040a 0%, #04040a 100%)",
      "radial-gradient(circle at 30% 50%, #090924 0%, #04040a 100%)"
    ]
  );

  // ── 2. Cột trái: Ảnh kính VR cực lớn
  const glassesOpacity = useTransform(progress, [0, 0.25], [0, 1]);
  const glassesScale = useTransform(progress, [0, 0.45], [0.85, 1.15]);
  const glassesX = useTransform(progress, [0, 0.3], [-100, 0]);

  // ── 3. Cột phải: Khối text chính
  const textOpacity = useTransform(progress, [0.15, 0.35], [0, 1]);
  const textY = useTransform(progress, [0.15, 0.35], [40, 0]);

  // ── 4. Từng icon & tính năng xuất hiện lần lượt
  // Item 1: 4K OLED
  const item1Opacity = useTransform(progress, [0.4, 0.55], [0, 1]);
  const item1X = useTransform(progress, [0.4, 0.55], [30, 0]);

  // Item 2: Spatial Audio
  const item2Opacity = useTransform(progress, [0.55, 0.7], [0, 1]);
  const item2X = useTransform(progress, [0.55, 0.7], [30, 0]);

  // Item 3: AI Tracking
  const item3Opacity = useTransform(progress, [0.7, 0.85], [0, 1]);
  const item3X = useTransform(progress, [0.7, 0.85], [30, 0]);

  // Glow vòng tròn phía sau kính
  const glowOpacity = useTransform(progress, [0.1, 0.4], [0, 0.35]);
  const glowScale = useTransform(progress, [0.1, 0.5], [0.8, 1.4]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Sticky Viewport */}
      <motion.div
        style={{ background: backgroundStyle }}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-700"
      >
        {/* Nền sao nhấp nháy */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {starsData.map((star) => (
            <span
              key={star.id}
              className="absolute rounded-full bg-indigo-200 animate-pulse"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                animationDelay: `${star.delay}s`,
                animationDuration: "3.5s",
              }}
            />
          ))}
        </div>

        {/* Khung Grid chính chia đôi màn hình */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center px-6 md:px-12 lg:px-16">

          {/* CỘT TRÁI: Ảnh kính cực lớn có kèm glow phía sau */}
          <div className="relative flex justify-center items-center h-full min-h-[300px] lg:min-h-[500px]">
            {/* Glow tròn tím xanh phía sau kính */}
            <motion.div
              style={{ opacity: glowOpacity, scale: glowScale }}
              className="absolute w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"
            />

            {/* Kính VR dịch chuyển nghiêng/float nhẹ tự động + zoom theo scroll */}
            <motion.div
              style={{
                opacity: glassesOpacity,
                scale: glassesScale,
                x: glassesX,
                mixBlendMode: "screen",
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full max-w-[450px] md:max-w-[550px] lg:max-w-none select-none cursor-pointer flex justify-center lg:justify-start mix-blend-screen"
            >
              <img
                src={story2Img}
                alt="PlayStation VR Details"
                className="w-full lg:w-[110%] h-auto object-contain mix-blend-screen drop-shadow-[0_20px_50px_rgba(99,102,241,0.55)] lg:-translate-x-12"
                draggable={false}
              />
            </motion.div>
          </div>

          {/* CỘT PHẢI: Khối text & Icons thông số */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="flex flex-col gap-8 text-left justify-center pr-4"
          >
            {/* Tiêu đề chính */}
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                Meet <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
                  PlayStation VR
                </span>
              </h2>
            </div>

            {/* Các câu mô tả dạng high-tech (có đường gạch đứng bên trái) */}
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4 py-0.5">
                <p className="text-slate-200 text-lg md:text-xl font-medium tracking-wide">
                  Không chỉ là một chiếc kính VR.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4 py-0.5">
                <p className="text-slate-200 text-lg md:text-xl font-medium tracking-wide">
                  Đây là cánh cửa bước vào thế giới số.
                </p>
              </div>
            </div>

            {/* Danh sách 3 thông số/icon hiện dần theo scroll */}
            <div className="flex flex-col gap-5 pt-4">
              {/* Item 1: 4K OLED */}
              <motion.div
                style={{ opacity: item1Opacity, x: item1X }}
                className="flex items-center gap-4 bg-slate-900/30 hover:bg-slate-900/50 border border-white/5 hover:border-indigo-500/25 px-5 py-3.5 rounded-xl transition-all duration-300 w-fit cursor-default"
              >
                <div className="p-2.5 bg-indigo-500/10 rounded-lg text-indigo-400">
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-white text-lg font-semibold tracking-wide">
                  4K OLED
                </span>
              </motion.div>

              {/* Item 2: Spatial Audio */}
              <motion.div
                style={{ opacity: item2Opacity, x: item2X }}
                className="flex items-center gap-4 bg-slate-900/30 hover:bg-slate-900/50 border border-white/5 hover:border-violet-500/25 px-5 py-3.5 rounded-xl transition-all duration-300 w-fit cursor-default"
              >
                <div className="p-2.5 bg-violet-500/10 rounded-lg text-violet-400">
                  <Volume2 className="w-6 h-6" />
                </div>
                <span className="text-white text-lg font-semibold tracking-wide">
                  Spatial Audio
                </span>
              </motion.div>

              {/* Item 3: AI Tracking */}
              <motion.div
                style={{ opacity: item3Opacity, x: item3X }}
                className="flex items-center gap-4 bg-slate-900/30 hover:bg-slate-900/50 border border-white/5 hover:border-purple-500/25 px-5 py-3.5 rounded-xl transition-all duration-300 w-fit cursor-default"
              >
                <div className="p-2.5 bg-purple-500/10 rounded-lg text-purple-400">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <span className="text-white text-lg font-semibold tracking-wide">
                  Plays Game
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Chỉ báo cuộn ở góc dưới màn hình */}
        <div className="absolute bottom-8 right-12 flex flex-col items-center gap-2 text-slate-500 pointer-events-none">
          <span className="text-[10px] tracking-widest uppercase font-medium">Progress</span>
          <div className="h-16 w-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleY: progress, originY: 0 }}
              className="w-full h-full bg-indigo-500 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Story2;
