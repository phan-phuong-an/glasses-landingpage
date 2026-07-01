import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, User, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AIChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Xin chào! Tôi là Gemini AI. Tôi có thể giúp gì cho bạn về kính VR hôm nay?',
    },
  ]);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    const newUserMessage = {
      id: Date.now(),
      sender: 'user',
      text: userText,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Initialize Gemini
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'your_api_key_here') {
        throw new Error("API key chưa được cấu hình trong file .env.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      // Construct a simple prompt using recent messages for context
      const chatContext = messages
        .slice(-4)
        .map(m => `${m.sender === 'ai' ? 'AI' : 'User'}: ${m.text}`)
        .join('\n');

      const prompt = `Bạn là trợ lý AI thông minh cho trang landing page về kính VR cao cấp. Hãy trả lời bằng tiếng Việt, ngắn gọn, thân thiện và hấp dẫn. Tập trung vào tính năng, trải nghiệm và lợi ích của kính VR.\n\nLịch sử trò chuyện:\n${chatContext}\n\nNgười dùng: ${userText}\nGemini AI:`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: responseText,
        },
      ]);
    } catch (error) {
      console.error("Gemini API Error:", error);

      // Hiển thị trực tiếp lỗi thực tế để biết chính xác Google báo gì
      const exactError = error.message || "Unknown error";
      let friendlyMessage = `Lỗi từ Google: ${exactError}`;

      if (exactError.includes("429") || exactError.includes("quota") || exactError.includes("Quota")) {
        friendlyMessage = `⏳ Google báo hết lượt/bận (429 Quota Exceeded). Chi tiết: ${exactError}`;
      } else if (exactError.includes("API key") || exactError.includes("401") || exactError.includes("403")) {
        friendlyMessage = `🔑 Lỗi API Key (401/403). Chi tiết: ${exactError}`;
      } else if (exactError.includes("404")) {
        friendlyMessage = `❌ Lỗi 404 Model không tồn tại. Chi tiết: ${exactError}`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: friendlyMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: 'spring', bounce: 0.3 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-3rem)] max-w-sm sm:w-96 h-[500px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-slate-700/50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md z-10">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-inner">
                    <Bot size={22} className="text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-indigo-600 shadow-sm"></span>
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight flex items-center gap-1">
                    Gemini AI <Sparkles size={14} className="text-yellow-300" />
                  </h3>
                  <p className="text-xs text-indigo-100/90 font-medium">Đang hoạt động</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                  >
                    <div
                      className={`flex gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 rounded-full flex items-center justify-center mt-auto ${msg.sender === 'user'
                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md'
                            : 'bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-700 dark:to-slate-600 text-indigo-600 dark:text-purple-300 shadow-sm border border-gray-200 dark:border-slate-500/50'
                          }`}
                      >
                        {msg.sender === 'user' ? (
                          <User size={14} className="sm:w-4 sm:h-4" />
                        ) : (
                          <Bot size={14} className="sm:w-4 sm:h-4" />
                        )}
                      </div>

                      {/* Bubble */}
                      <div
                        className={`p-3 rounded-2xl text-[13px] sm:text-sm shadow-sm ${msg.sender === 'user'
                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-br-sm'
                            : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-slate-700 rounded-bl-sm'
                          }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex gap-2.5 max-w-[85%] flex-row">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 rounded-full flex items-center justify-center mt-auto bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-700 dark:to-slate-600 text-indigo-600 dark:text-purple-300 shadow-sm border border-gray-200 dark:border-slate-500/50">
                        <Bot size={14} className="sm:w-4 sm:h-4" />
                      </div>
                      <div className="p-3 rounded-2xl text-[13px] sm:text-sm shadow-sm bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-slate-700 rounded-bl-sm flex items-center gap-1.5">
                        <Loader2 size={16} className="animate-spin text-indigo-500" />
                        <span className="text-gray-500 text-xs font-medium">Gemini đang trả lời...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 bg-gray-50/80 dark:bg-slate-900/80 border-t border-gray-100 dark:border-slate-700/50 backdrop-blur-md z-10">
              <form
                onSubmit={handleSend}
                className="flex items-center gap-2 relative"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Hỏi Gemini AI bất cứ điều gì..."
                  className="flex-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-100 text-sm rounded-full px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Send size={18} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={26} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare size={26} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulsating Ring */}
        {!isOpen && (
          <span className="absolute -inset-1.5 rounded-full border-2 border-indigo-400/50 animate-ping -z-10 group-hover:border-indigo-400/80 duration-1000"></span>
        )}
      </motion.button>
    </div>
  );
};

export default AIChatBox;
