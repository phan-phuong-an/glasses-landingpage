import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown, ArrowRight } from "lucide-react";
import heroBgImg from "../assets/images/about_hero_bg.webp";
import collage1Img from "../assets/images/about_collage1.webp";
import collage2Img from "../assets/images/about_collage2.webp";
import collage3Img from "../assets/images/about_collage3.webp";
import featureImg from "../assets/images/about_feature.webp";
import learnImg from "../assets/images/about_learn.webp";

// ─────────────────────────────────────────────
// Section 1 – Hero Banner
// ─────────────────────────────────────────────
const HeroBanner = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6 py-24">
    {/* Ảnh nền làm mờ */}
    <div className="absolute inset-0">
      <img loading="lazy"
        src={heroBgImg}
        alt=""
        className="w-full h-full object-cover"
        style={{ filter: "blur(4px) brightness(0.3) saturate(1.4)", transform: "scale(1.05)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/70 via-[#070f2b]/60 to-[#020617]/95" />
    </div>

    {/* Nội dung */}
    <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Label */}
        <div className="flex items-center gap-4 text-slate-400 text-xs tracking-[0.3em] uppercase">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-indigo-500" />
          PlayStation VR2 — LenOVR
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-indigo-500" />
        </div>

        {/* Tiêu đề trang trí */}
        <h1
          className="text-5xl md:text-6xl xl:text-7xl font-black tracking-wider uppercase leading-tight"
          style={{
            background: "linear-gradient(135deg, #e0e7ff 0%, #a5b4fc 40%, #c4b5fd 80%, #f0abfc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ✦ KÍNH VR ✦
          <br />
          <span className="text-3xl md:text-4xl xl:text-5xl font-bold">
            CÔNG NGHỆ ĐỈNH CAO
          </span>
        </h1>

        <p className="text-slate-300 text-base md:text-lg tracking-[0.12em] uppercase font-medium">
          Chìa khóa mở ra thế giới thực tế ảo vô tận
        </p>
      </motion.div>

      {/* Dải sao phân cách */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex items-center gap-4"
      >
        <span className="text-xl text-indigo-400">★</span>
        <span className="text-xl text-violet-400">★</span>
        <span className="text-xl text-indigo-400">★</span>
      </motion.div>

      {/* Bullet points thống kê */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="flex flex-col gap-3 text-left max-w-xl w-full"
      >
        {[
          "✗ 80% người mua hàng bị ảnh hưởng bởi trải nghiệm thực tế trước khi quyết định mua thiết bị VR.",
          "✗ 90% game thủ hiện đại mong muốn sở hữu thiết bị VR chuyên nghiệp để nâng cao trải nghiệm.",
          "✗ 8% doanh nghiệp hiện đang đầu tư mạnh vào công nghệ VR như một kênh giải trí và marketing.",
        ].map((text, i) => (
          <p key={i} className="text-slate-300/80 text-sm md:text-base leading-relaxed">
            {text}
          </p>
        ))}
      </motion.div>

      {/* Scroll arrow */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="mt-4 text-slate-500"
      >
        <ChevronDown className="w-7 h-7" />
      </motion.div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Section 2 – "Nếu bạn muốn" (Collage + bullets)
// ─────────────────────────────────────────────
const NeuBanMuon = () => (
  <section className="py-20 px-6 bg-slate-950">
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

      {/* CỘT TRÁI: Image collage */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-2 gap-3"
      >
        {/* Ảnh lớn chiếm full cột trái, 2 hàng */}
        <div className="row-span-2 rounded-2xl overflow-hidden border border-indigo-500/20 shadow-xl shadow-indigo-900/20 min-h-[280px]">
          <img loading="lazy" src={collage1Img} alt="VR World" className="w-full h-full object-cover" />
        </div>
        {/* Ảnh nhỏ trên phải */}
        <div className="rounded-2xl overflow-hidden border border-violet-500/20 shadow-lg h-[134px]">
          <img loading="lazy" src={collage2Img} alt="VR Headset" className="w-full h-full object-cover" />
        </div>
        {/* Ảnh nhỏ dưới phải */}
        <div className="rounded-2xl overflow-hidden border border-purple-500/20 shadow-lg h-[134px]">
          <img loading="lazy" src={collage3Img} alt="VR Lifestyle" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* CỘT PHẢI: Bullet points */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col gap-6"
      >
        <div>
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(165,148,255,1)" }}>
            Tại sao chọn LenOVR?
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            Nếu bạn muốn{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #818cf8, #a78bfa, #c084fc)" }}
            >
              đột phá
            </span>{" "}
            trải nghiệm gaming
          </h2>
        </div>

        <ul className="flex flex-col gap-4">
          {[
            "Khám phá thế giới 3D sống động với độ phân giải 4K OLED chuẩn quốc tế.",
            "Tự do điều hướng trong không gian 360° với tay cầm Sense Controller chính xác tuyệt đối.",
            "Đắm chìm vào hơn 500 tựa game độc quyền từ các nhà phát triển hàng đầu thế giới.",
            "Kết nối cộng đồng game thủ VR toàn cầu và chia sẻ những khoảnh khắc đáng nhớ.",
            "Kiếm thêm thu nhập và trải nghiệm game cùng bạn bè trong không gian thực tế ảo.",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Section 3 – Feature highlight (dark accent, 2 col)
// ─────────────────────────────────────────────
const FeatureHighlight = ({ onNavigate }) => (
  <section
    className="py-24 px-6 relative overflow-hidden"
    style={{ background: "linear-gradient(135deg, #0f0c29 0%, #1d1b4b 40%, #0c0a24 100%)" }}
  >
    <div className="absolute inset-0 pointer-events-none opacity-40"
      style={{ backgroundImage: "radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.15) 0%, transparent 60%)" }}
    />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }} />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)" }} />

    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

      {/* CỘT TRÁI: Text lớn + features + CTA */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col gap-6"
      >
        <p className="text-indigo-300 text-xs font-bold tracking-[0.3em] uppercase">
          Khoá trải nghiệm này dành cho bạn
        </p>
        <h2 className="text-4xl md:text-5xl xl:text-6xl font-black leading-tight text-white uppercase tracking-wide">
          Trải nghiệm
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg, #818cf8, #a78bfa, #f0abfc)" }}
          >
            VR Đỉnh Cao
          </span>
          <br />
          PlayStation
        </h2>

        <ul className="flex flex-col gap-3">
          {[
            "Màn hình OLED 4K siêu sắc nét, mượt mà từ ngày đầu sử dụng",
            "7 ngày hỗ trợ kỹ thuật và bảo hành toàn bộ thiết bị",
            "23 tựa game chuyên sâu, bài bản kèm bản cập nhật mới nhất",
            "50,000+ người dùng VR đã trải nghiệm và tin tưởng LenOVR",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-center text-slate-300 text-sm">
              <div className="w-4 h-4 rounded-full border border-indigo-400 flex items-center justify-center flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              </div>
              {item}
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            document.getElementById("register-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
          className="mt-2 self-start px-8 py-3.5 font-bold text-white rounded-xl tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group"
          style={{
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            boxShadow: "0 8px 24px rgba(79,70,229,0.4)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 12px 32px rgba(79,70,229,0.6)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(79,70,229,0.4)"; }}
        >
          Đăng ký ngay
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* CỘT PHẢI: Ảnh mới */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="flex items-center justify-center relative"
      >
        <div className="absolute w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(99,102,241,0.15)" }} />
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(99,102,241,0.3)" }}
        >
          <img loading="lazy"
            src={featureImg}
            alt="VR Controller"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.85) saturate(1.2)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.15), rgba(139,92,246,0.1))" }} />
        </div>
      </motion.div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Section 4 – "Bạn sẽ trải nghiệm" (Ảnh trái + text phải)
// ─────────────────────────────────────────────
const BanSeHoc = () => (
  <section className="py-20 px-6" style={{ background: "#070b1a" }}>
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      {/* CỘT TRÁI: Ảnh */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(139,92,246,0.25)" }}
        >
          <img loading="lazy"
            src={learnImg}
            alt="VR Immersion"
            className="w-full object-cover"
            style={{ filter: "brightness(0.85) saturate(1.2)" }}
          />
          <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(to top right, rgba(79,70,229,0.2), transparent)" }} />
        </div>
        {/* Badge góc */}
        <div
          className="absolute -top-4 -left-4 px-4 py-2 rounded-xl text-xs font-bold text-white"
          style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 4px 16px rgba(79,70,229,0.5)" }}
        >
          PlayStation VR2
        </div>
      </motion.div>

      {/* CỘT PHẢI: Watermark brand + numbered list */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative flex flex-col gap-6"
      >
        {/* Watermark */}
        <div
          className="absolute -top-4 left-0 text-7xl md:text-8xl font-black select-none pointer-events-none leading-none tracking-tighter uppercase"
          style={{ color: "rgba(99,102,241,0.07)", letterSpacing: "-0.04em" }}
        >
          LenOVR
        </div>

        <div className="relative z-10">
          <p className="text-indigo-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Bạn sẽ được trải nghiệm
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-8">
            4 điều{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #818cf8, #c084fc)" }}
            >
              đặc biệt
            </span>{" "}
            chỉ có tại LenOVR
          </h2>

          <ol className="flex flex-col gap-5">
            {[
              "Cách lựa chọn thiết bị VR phù hợp với nhu cầu và ngân sách của bạn.",
              "Khám phá tất cả bí kíp sử dụng PlayStation VR2 như một game thủ chuyên nghiệp.",
              "Cứu lấy kỷ niệm bằng cách quay và chụp ảnh từ góc nhìn thứ nhất trong VR.",
              "Thực hành điều chỉnh lens phù hợp với mắt, phòng ngừa mệt mỏi thị giác...",
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white"
                  style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 4px 12px rgba(79,70,229,0.4)" }}
                >
                  {i + 1}
                </span>
                <p className="text-slate-300 text-sm leading-relaxed pt-1">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Main About Me Component
// ─────────────────────────────────────────────
const AboutMe = ({ onNavigate }) => {
  return (
    <div className="bg-[#020617]">
      <HeroBanner />
      <NeuBanMuon />
      <FeatureHighlight onNavigate={onNavigate} />
      <BanSeHoc />
    </div>
  );
};

export default AboutMe;
