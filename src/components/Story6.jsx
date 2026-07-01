import React from "react";
import { Star } from "lucide-react";

// ===================== DATA =====================
const reviews = [
  {
    id: 1,
    stars: 5,
    text: "Trải nghiệm nhập vai xuất sắc nhất tôi từng thử. Cảm giác kéo cung trong Horizon chân thực đến khó tin nhờ phản hồi xúc giác.",
    author: "GamerVN_99",
    tag: "PlayStation Việt Nam",
    avatar: "G",
    avatarColor: "#3b82f6",
  },
  {
    id: 2,
    stars: 5,
    text: "Công nghệ Eye-tracking thật sự là một bước nhảy vọt. Đồ họa sắc nét, tốc độ phản hồi cực nhanh. Không thể tin đây là thực tế ảo.",
    author: "TechReviewer",
    tag: "Công Nghệ Việt",
    avatar: "T",
    avatarColor: "#a855f7",
  },
  {
    id: 3,
    stars: 4,
    text: "Rất thoải mái khi đeo trong nhiều giờ liền. Thiết lập vô cùng đơn giản chỉ với một sợi cáp. Đúng là PlayStation, đỉnh thật.",
    author: "PS5_Fanboy",
    tag: "Game Thủ HCM",
    avatar: "P",
    avatarColor: "#0ea5e9",
  },
  {
    id: 4,
    stars: 5,
    text: "Gran Turismo 7 trên PSVR2 là trải nghiệm racing số một. Buồng lái ảo mà cảm giác thật y như đang ngồi trong xe thật.",
    author: "Racing_King_VN",
    tag: "Esports Việt",
    avatar: "R",
    avatarColor: "#f59e0b",
  },
  {
    id: 5,
    stars: 5,
    text: "Resident Evil Village VR làm tôi đứng tim mấy lần. Chưa bao giờ tôi thấy sợ đến vậy — theo nghĩa tốt nhất có thể!",
    author: "HorrorGameLover",
    tag: "Review Channel",
    avatar: "H",
    avatarColor: "#ef4444",
  },
  {
    id: 6,
    stars: 4,
    text: "Haptic feedback trên tay cầm Sense thật sự đưa immersion lên tầm mới. Mỗi cú bắn, mỗi nhát chém đều có cảm giác rõ ràng.",
    author: "NextGenGamer",
    tag: "PS5 Community",
    avatar: "N",
    avatarColor: "#10b981",
  },
];

// Nhân đôi để seamless loop
const allReviews = [...reviews, ...reviews];

// ===================== STAR RATING =====================
const StarRating = ({ count }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < count ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}`}
      />
    ))}
  </div>
);

// ===================== REVIEW CARD =====================
const ReviewCard = ({ review }) => (
  <div
    className="relative flex-shrink-0 w-[340px] md:w-[380px] mx-3 rounded-2xl p-6 flex flex-col gap-4"
    style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(12px)",
    }}
  >
    {/* Quote icon */}
    <div className="absolute top-4 right-5 text-6xl font-black text-white/[0.04] select-none leading-none">
      "
    </div>

    <StarRating count={review.stars} />

    <p className="text-slate-300 text-sm md:text-base leading-relaxed flex-1">
      "{review.text}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 mt-1">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
        style={{ background: review.avatarColor }}
      >
        {review.avatar}
      </div>
      <div>
        <p className="text-white font-semibold text-sm leading-tight">@{review.author}</p>
        <p className="text-slate-500 text-xs">{review.tag}</p>
      </div>
    </div>
  </div>
);

// ===================== STORY 6 =====================
const Story6 = () => {
  return (
    <section
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ---- Header ---- */}
      <div className="relative z-10 text-center mb-14 px-6">
        <p className="text-indigo-400 text-sm font-bold tracking-[0.35em] uppercase mb-4">
          Review Cộng Đồng
        </p>
        <h2 className="text-white font-black text-4xl md:text-6xl lg:text-7xl tracking-tight leading-tight">
          Cộng Đồng{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Đang Nói Gì?
          </span>
        </h2>
        <p className="text-slate-400 mt-5 text-lg max-w-xl mx-auto">
          Hàng nghìn game thủ đã bước vào thế giới mới — và họ không muốn quay lại.
        </p>
      </div>

      {/* ---- Marquee Row 1 (Left → Right direction) ---- */}
      <div className="relative overflow-hidden mb-4">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }} />

        <div className="marquee-track flex">
          {allReviews.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* ---- Marquee Row 2 (Reverse direction) ---- */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }} />

        <div className="marquee-track-reverse flex">
          {/* Reversed order for visual variety */}
          {[...allReviews].reverse().map((review, i) => (
            <ReviewCard key={`rev-${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* ---- Bottom tag ---- */}
      <div className="relative z-10 text-center mt-14 px-6">
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-slate-400"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span className="text-yellow-400">★★★★★</span>
          <span>Đánh giá trung bình 4.9/5 từ cộng đồng game thủ</span>
        </div>
      </div>

      {/* ---- CSS Keyframes for infinite marquee ---- */}
      <style>{`
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-track {
          animation: marqueeLeft 32s linear infinite;
          width: max-content;
        }
        .marquee-track-reverse {
          animation: marqueeRight 38s linear infinite;
          width: max-content;
        }
        .marquee-track:hover,
        .marquee-track-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Story6;
