# 🥽 LenOVR — PlayStation VR2 Landing Page

Trang landing page giới thiệu sản phẩm **PlayStation VR2** với thiết kế hiện đại, dark mode, hiệu ứng cuộn Scrollytelling và tích hợp **AI Chatbox** (Gemini AI).

---

## ✨ Tính năng nổi bật

- 🎬 **Scrollytelling** — Hiệu ứng kể chuyện cuộn trang mượt mà qua nhiều phần (Story 1–6)
- 🛍️ **Mini E-commerce** — Xem sản phẩm, thêm vào giỏ hàng, wishlist, lịch sử xem gần đây
- 🤖 **AI Chatbox** — Trò chuyện với Gemini AI về sản phẩm VR, hỗ trợ định dạng Markdown
- 📩 **Newsletter Form** — Đăng ký nhận tin tức qua Formspree
- 🌗 **Dark Mode** — Giao diện tối mặc định, tối ưu trải nghiệm thị giác
- 📱 **Responsive** — Tương thích đầy đủ trên mobile, tablet và desktop

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Mô tả |
|---|---|
| [React 19](https://react.dev/) | Thư viện UI |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [Framer Motion](https://www.framer.com/motion/) | Animation & transitions |
| [Gemini AI API](https://ai.google.dev/) | AI Chatbox |
| [React Markdown](https://github.com/remarkjs/react-markdown) | Render Markdown từ AI |
| [Lucide React](https://lucide.dev/) | Icon |
| [Formspree](https://formspree.io/) | Xử lý form đăng ký |

---

## 🚀 Cài đặt & Chạy dự án

### 1. Clone repository

```bash
git clone https://github.com/phan-phuong-an/glasses-landingpage.git
cd glasses-landingpage
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình biến môi trường

Tạo file `.env` ở thư mục gốc:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

> Lấy API key miễn phí tại [Google AI Studio](https://aistudio.google.com/apikey)

### 4. Chạy dev server

```bash
npm run dev
```

Truy cập [http://localhost:5173](http://localhost:5173) trên trình duyệt.

---

## 📁 Cấu trúc thư mục

```
src/
├── assets/         # Ảnh, video
├── components/
│   ├── Navbar.jsx       # Thanh điều hướng
│   ├── Hero.jsx         # Section mở đầu
│   ├── Story.jsx        # Scrollytelling phần 1-6
│   ├── Products.jsx     # Danh sách sản phẩm
│   ├── CartDrawer.jsx   # Giỏ hàng, wishlist, lịch sử
│   ├── AIChatBox.jsx    # AI Chatbox (Gemini)
│   └── Footer.jsx       # Footer + form đăng ký
├── context/
│   └── ShopContext.jsx  # Global state giỏ hàng
└── App.jsx
```

---

## 🌿 Branch

| Branch | Mô tả |
|---|---|
| `main` | Production-ready |
| `develop` | Nhánh phát triển chính |
| `feature/hero-section` | Section hero |
| `feature/story-section` | Scrollytelling |
| `feature/ecommerce-mini` | Mini shop & AI chatbox |
| `feature/chatbox-ai` | AI chatbox (riêng) |

---

## 📄 License

MIT © 2026 LenOVR
