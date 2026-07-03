import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import video từ thư mục src/assets (cách Vite xử lý file local)
import story4_1_video from "../assets/Videos/Story4_1.mp4";
import story4_2_video from "../assets/Videos/Story4_2.mp4";
import story4_3_video from "../assets/Videos/Story4_3.mp4";

const gameScenes = [
  {
    id: "horizon",
    genre: "Hành Động & Phiêu Lưu",
    title: "Khám phá vô tận.",
    description: "Hòa mình vào thiên nhiên hùng vĩ của Horizon Call of the Mountain. Mỗi bước chân, mỗi nhịp thở đều chân thực như bạn đang ở đó.",
    color: "text-emerald-400",
    videoUrl: story4_1_video,
  },
  {
    id: "resident-evil",
    genre: "Kinh Dị & Sinh Tồn",
    title: "Cảm nhận nỗi sợ chân thực.",
    description: "Bóng tối bao trùm, âm thanh vây quanh. Trong Resident Evil Village VR, bạn không chỉ chơi, bạn đang tìm cách sống sót.",
    color: "text-red-500",
    videoUrl: story4_2_video,
  },
  {
    id: "gran-turismo",
    genre: "Tốc Độ & Đua Xe",
    title: "Làm chủ tốc độ.",
    description: "Ngồi vào buồng lái Gran Turismo 7, cảm nhận sức mạnh động cơ và lực ép ở từng khúc cua gắt nhất.",
    color: "text-blue-400",
    videoUrl: story4_3_video,
  },
];

const Story4 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === gameScenes.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? gameScenes.length - 1 : prev - 1));
  };

  return (
    <section ref={ref} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* ================= BACKGROUND VIDEOS (YouTube Embeds) ================= */}
      {gameScenes.map((scene, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={scene.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-0" : "opacity-0 -z-10"
              }`}
          >
            {/* Vùng mask để tránh click vào youtube */}
            <div className="absolute inset-0 z-10 pointer-events-auto" />

            {/* Sử dụng thẻ video HTML5 thay vì iframe YouTube để tránh bị chặn bản quyền/localhost */}
            {isInView && (
              <video
                src={scene.videoUrl}
                autoPlay
                loop
                muted={true}
                playsInline
                preload="none"
                className="absolute w-full h-full object-cover opacity-60 pointer-events-none"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#02020a] via-black/50 to-black/30 z-10 pointer-events-none" />
          </div>
        );
      })}

      {/* ================= OVERLAYS & TEXT ================= */}

      {/* Tiêu đề chính */}
      <div className="absolute top-[10%] left-0 w-full text-center z-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-white text-3xl md:text-5xl lg:text-6xl font-black tracking-tight drop-shadow-2xl"
        >
          Sống Trong{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            Thế Giới Game
          </span>
        </motion.h2>
      </div>

      {/* Cụm Text Slider */}
      <div className="relative z-20 w-full max-w-4xl px-4 md:px-0 mx-auto flex items-center justify-center pointer-events-none">

        {/* Text Nội dung */}
        <div className="text-center h-64 flex flex-col justify-center overflow-hidden pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center pointer-events-none"
            >
              <p className={`${gameScenes[currentIndex].color} text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4 drop-shadow-md`}>
                {gameScenes[currentIndex].genre}
              </p>
              <h3 className="text-white text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight drop-shadow-xl max-w-3xl">
                {gameScenes[currentIndex].title}
              </h3>
              <p className="text-slate-300 mt-6 text-sm md:text-lg lg:text-xl max-w-xl mx-auto drop-shadow-md">
                {gameScenes[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Nút Prev - Đẩy sát mép ngoài */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-xl"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Nút Next - Đẩy sát mép ngoài */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-xl"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Dấu chấm chỉ báo (Indicators) */}
      <div className="absolute bottom-[10%] left-0 w-full flex justify-center gap-3 z-20">
        {gameScenes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${index === currentIndex ? "w-8 bg-white" : "w-3 bg-white/30 hover:bg-white/50"
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Story4;
