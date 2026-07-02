import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Tag, Send } from "lucide-react";

// Import hình nền do AI sinh ra
import contactBg from "../assets/images/contact_hero_bg.png";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi form ở đây
    console.log("Form Data:", formData);
    alert("Đã gửi tin nhắn thành công!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="relative min-h-screen bg-[#050714] overflow-hidden flex items-center justify-center pt-24 pb-12 px-4 md:px-8">
      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#050714]/60 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050714] via-transparent to-[#050714]/80 z-10" />
        <img
          src={contactBg}
          alt="Cyberpunk VR Contact Background"
          className="w-full h-full object-cover object-center opacity-80"
        />
      </div>

      {/* ── Form Container ── */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-end">
        {/* Khung form Cyberpunk */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-[500px] relative p-1 mt-10 md:mt-0"
        >
          {/* Border phát sáng phong cách viễn tưởng */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-cyan-400/80 via-transparent to-blue-600/80 pointer-events-none opacity-50" />
          <div className="absolute -inset-0.5 rounded-2xl bg-cyan-500/20 blur-sm pointer-events-none" />

          {/* Nội dung Form */}
          <div className="relative bg-[#0b1021]/80 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.15)]">
            
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-2xl pointer-events-none" />

            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 uppercase tracking-wider mb-2" style={{ textShadow: "0 0 20px rgba(34,211,238,0.4)" }}>
                Liên Hệ Với Chúng Tôi
              </h2>
              <p className="text-cyan-100/70 text-sm">
                Hãy để lại lời nhắn cho đội ngũ hỗ trợ PS VR của chúng tôi
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Họ và Tên"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1e293b]/50 border border-cyan-900/50 rounded-xl py-3 pl-12 pr-4 text-cyan-50 placeholder-cyan-600 focus:outline-none focus:border-cyan-400 focus:bg-[#1e293b]/80 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                />
              </div>

              {/* Email */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1e293b]/50 border border-cyan-900/50 rounded-xl py-3 pl-12 pr-4 text-cyan-50 placeholder-cyan-600 focus:outline-none focus:border-cyan-400 focus:bg-[#1e293b]/80 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                />
              </div>

              {/* Subject */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400">
                  <Tag size={18} />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Chủ đề"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1e293b]/50 border border-cyan-900/50 rounded-xl py-3 pl-12 pr-4 text-cyan-50 placeholder-cyan-600 focus:outline-none focus:border-cyan-400 focus:bg-[#1e293b]/80 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                />
              </div>

              {/* Message */}
              <div className="relative group">
                <textarea
                  name="message"
                  placeholder="Tin nhắn"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1e293b]/50 border border-cyan-900/50 rounded-xl py-4 px-4 text-cyan-50 placeholder-cyan-600 focus:outline-none focus:border-cyan-400 focus:bg-[#1e293b]/80 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group relative flex items-center justify-center gap-2 w-max mx-auto mt-4 px-10 py-3.5 bg-cyan-500 text-[#0f172a] font-bold rounded-full overflow-hidden transition-transform active:scale-95"
                style={{ boxShadow: "0 0 20px rgba(6,182,212,0.6)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 uppercase tracking-wider text-sm">Gửi tin nhắn</span>
                <Send size={16} className="relative z-10" />
              </button>
            </form>
            
            {/* Branding Logo Bottom Left */}
            <div className="absolute bottom-4 left-6 text-cyan-800 font-bold text-xs flex items-center gap-2 opacity-50">
              <span className="w-4 h-4 bg-cyan-800 inline-block mask mask-squircle"></span>
              PS VR2
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
