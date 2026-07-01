import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, ArrowRight, CheckCircle, Gamepad2, AlertCircle,
  Code2, MessageCircle, Globe, Share2, Sparkles, Heart
} from "lucide-react";
import story7Bg from "../assets/images/story7_bg.png";

// 👉 Đăng ký miễn phí tại https://formspree.io → New Form → copy Form ID
const FORMSPREE_ENDPOINT = "https://formspree.io/f/meebrezl";

const Footer = () => {
  // --- Form States ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Vui lòng nhập tên của bạn";
    if (!email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitError("");
    setIsLoading(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, _subject: `[PSVR2 Landing] Đăng ký từ ${name}` }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        setSubmitError(data?.error || "Đã xảy ra lỗi. Vui lòng thử lại!");
      }
    } catch {
      setSubmitError("Không thể kết nối. Kiểm tra lại mạng và thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Footer Links ---
  const socialLinks = [
    { name: "GitHub", href: "https://github.com/", icon: Code2, label: "GitHub repository" },
    { name: "Twitter / X", href: "https://twitter.com/", icon: MessageCircle, label: "Twitter / X" },
    { name: "Website", href: "https://helicorp.vn", icon: Globe, label: "Official website" },
    { name: "Share", href: "#", icon: Share2, label: "Share" },
  ];

  const legalLinks = [
    { name: "Chính sách bảo mật", href: "#" },
    { name: "Điều khoản sử dụng", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ];

  return (
    <footer className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24">
      {/* ---- Background image (blurred) ---- */}
      <div className="absolute inset-0">
        <img
          src={story7Bg}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "blur(20px) brightness(0.35) saturate(1.4)", transform: "scale(1.1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

        {/* ================= LEFT COLUMN: Text + Footer Info ================= */}
        <div className="flex flex-col gap-12 max-w-xl">
          {/* Header Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-blue-300 mb-6"
              style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)" }}>
              <Gamepad2 className="w-3.5 h-3.5" />
              PlayStation VR2
            </div>
            <h2 className="text-white font-black text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
              Sẵn Sàng Bước Vào{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Thế Giới Mới?
              </span>
            </h2>
            <p className="text-slate-400 mt-6 text-base md:text-lg leading-relaxed">
              Đăng ký để nhận thông tin mới nhất, ưu đãi độc quyền và bản cập nhật sớm nhất từ PlayStation VR. Trải nghiệm thực tế ảo đỉnh cao đang chờ đón bạn.
            </p>
          </motion.div>

          {/* Footer Info (Logo, Socials, Legal) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-8 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Row 1: Logo & Social */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              {/* Logo */}
              <div className="flex items-center gap-2.5 group cursor-pointer">
                <div className="bg-indigo-600 text-white p-1.5 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Sparkles size={18} className="fill-white/20" />
                </div>
                <span className="font-bold text-xl text-white tracking-tight">LenOVR</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-110"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"; e.currentTarget.style.background = "rgba(99,102,241,0.12)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                    >
                      <Icon size={17} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Row 2: Legal & Copyright */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-slate-500">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {legalLinks.map((link) => (
                  <a key={link.name} href={link.href} className="hover:text-slate-300 transition-colors duration-200">
                    {link.name}
                  </a>
                ))}
              </div>
              <p className="flex items-center gap-1.5">
                © 2026 LenOVR. <Heart size={12} className="text-red-500 fill-red-500 inline" />
              </p>
            </div>
          </motion.div>
        </div>


        {/* ================= RIGHT COLUMN: Form ================= */}
        <div className="w-full max-w-md mx-auto lg:ml-auto lg:mr-0">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <h3 className="text-white text-xl font-bold mb-2">Đăng ký tham gia</h3>

                  {/* Name Field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-400 text-sm font-medium">Tên hiển thị</label>
                    <div className="relative">
                      <User
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors duration-200 ${focusedField === "name" ? "text-blue-400" : "text-slate-500"}`}
                        style={{ width: 18, height: 18 }}
                      />
                      <input
                        type="text"
                        placeholder="Nhập tên của bạn..."
                        value={name}
                        onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: "" })); }}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white text-sm placeholder-slate-500 outline-none transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: `1px solid ${errors.name ? "#ef4444" : focusedField === "name" ? "#3b82f6" : "rgba(255,255,255,0.1)"}`,
                          boxShadow: focusedField === "name" ? "0 0 0 3px rgba(59,130,246,0.15)" : "none",
                        }}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs ml-1">
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-400 text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === "email" ? "text-blue-400" : "text-slate-500"}`}
                        style={{ width: 18, height: 18 }}
                      />
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: "" })); }}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white text-sm placeholder-slate-500 outline-none transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: `1px solid ${errors.email ? "#ef4444" : focusedField === "email" ? "#3b82f6" : "rgba(255,255,255,0.1)"}`,
                          boxShadow: focusedField === "email" ? "0 0 0 3px rgba(59,130,246,0.15)" : "none",
                        }}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs ml-1">
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full py-4 rounded-xl font-bold text-white text-sm tracking-widest uppercase overflow-hidden mt-4 transition-all duration-200"
                    style={{
                      background: isLoading
                        ? "rgba(59,130,246,0.5)"
                        : "linear-gradient(135deg, #1d4ed8 0%, #4f46e5 50%, #7c3aed 100%)",
                      boxShadow: isLoading ? "none" : "0 8px 24px rgba(79,70,229,0.4)",
                    }}
                  >
                    {!isLoading && (
                      <div
                        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)" }}
                      />
                    )}
                    <span className="relative flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Đang xử lý...
                        </>
                      ) : (
                        <>
                          Đăng Ký Ngay
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 p-3 mt-2 rounded-xl text-red-300 text-sm"
                        style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)" }}
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {submitError}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                  className="flex flex-col items-center text-center py-8 gap-5"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, type: "spring", bounce: 0.5 }}
                  >
                    <CheckCircle className="w-20 h-20 text-green-400" strokeWidth={1.5} />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-black text-2xl mb-2">
                      Thành công!
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed max-w-xs mx-auto">
                      Cảm ơn <span className="text-blue-300 font-semibold">{name}</span>. Bạn đã đăng ký thành công!
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-2 px-5 py-2.5 mt-2 rounded-full text-xs text-slate-400"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Đã gửi đến <span className="text-blue-400 font-medium">{email}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!isSubmitted && (
              <div className="mt-6 text-center text-slate-500 text-xs">
                Hơn <span className="text-slate-300 font-semibold">12,000+</span> người đã đăng ký
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
