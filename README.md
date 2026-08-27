# ResidentHub — MVP Frontend

Nền tảng quản lý cư dân cho các công ty vận hành nhà trọ, chung cư mini,
căn hộ cho thuê. Bản này là **MVP frontend, dùng dữ liệu mock**, chưa có
backend/database.

## Công nghệ

- React 18 + Vite
- Tailwind CSS
- React Router v6
- JavaScript (không TypeScript)

## Cài đặt

```bash
npm install
```

## Chạy dự án (development)

```bash
npm run dev
```

Mặc định chạy tại `http://localhost:5173`.

## Build production

```bash
npm run build
npm run preview   # xem thử bản build
```

## Tài khoản demo

| Vai trò        | Email             | Mật khẩu |
|-----------------|-------------------|----------|
| Company Admin  | admin@demo.com    | 123456   |
| Resident       | resident@demo.com | 123456   |

Trang đăng nhập cũng có nút "điền nhanh" hai tài khoản này.

## Cấu trúc thư mục

```
src/
├── main.jsx                  # Entry point, bọc BrowserRouter + AuthProvider
├── App.jsx                   # Render AppRouter
├── index.css                 # Tailwind + style nền tảng
├── router/
│   └── AppRouter.jsx         # Khai báo toàn bộ route, bọc ProtectedRoute theo role
├── context/
│   └── AuthContext.jsx       # Session giả lập (login/logout) lưu ở localStorage
├── data/
│   └── mockData.js           # Toàn bộ dữ liệu mock: user, tòa nhà, hóa đơn, yêu cầu hỗ trợ...
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx    # Chặn route theo trạng thái đăng nhập + role
│   ├── layout/
│   │   ├── CompanyLayout.jsx     # Layout khung cho Company Admin (Sidebar + Topbar)
│   │   ├── Sidebar.jsx           # Menu dọc của Company Admin
│   │   ├── Topbar.jsx            # Thanh trên cùng của Company Admin
│   │   ├── ResidentLayout.jsx    # Layout khung cho Resident (nav ngang)
│   │   └── ResidentNav.jsx       # Nav đơn giản của Resident
│   └── common/
│       ├── StatCard.jsx      # Ô KPI trên dashboard
│       ├── Badge.jsx         # Nhãn trạng thái (đã thanh toán, quá hạn...)
│       └── Avatar.jsx        # Avatar chữ cái đầu tên
└── pages/
    ├── LoginPage.jsx
    ├── company/
    │   └── CompanyDashboard.jsx
    └── resident/
        └── ResidentDashboard.jsx
```

## Cách hoạt động của Role-based Access

1. `AuthContext` lưu user đang đăng nhập (không lưu password) vào
   `localStorage`, mô phỏng một phiên đăng nhập thật.
2. `ProtectedRoute` kiểm tra:
   - Chưa đăng nhập → chuyển về `/login`.
   - Đã đăng nhập nhưng sai `role` được phép (`allowedRoles`) → tự động
     chuyển về đúng dashboard của họ, không cho thấy nội dung sai quyền.
3. `AppRouter` gom các route theo nhóm `/company/*` (chỉ `company_admin`)
   và `/resident/*` (chỉ `resident`), mỗi nhóm có layout riêng.

Khi có backend thật, bạn chỉ cần thay phần thân hàm `login()` trong
`AuthContext.jsx` bằng một API call thật — phần routing và giao diện
không cần thay đổi.

## Đã hoàn thành trong bản này

- [x] Login page (kèm tài khoản demo, validate, giả lập trạng thái loading)
- [x] Company Dashboard (KPI, tòa nhà, hóa đơn gần đây, yêu cầu hỗ trợ)
- [x] Resident Dashboard (thông tin phòng/hợp đồng, hóa đơn, thông báo, yêu cầu hỗ trợ)
- [x] Routing + role-based access bằng mock user
- [x] Sidebar cho Company Admin
- [x] Navigation đơn giản cho Resident

Các mục menu chưa xây (Cư dân, Tòa nhà & Phòng, Hợp đồng...) đã được
đặt sẵn trong Sidebar/Nav ở trạng thái "sắp ra mắt" để định hình cấu
trúc sản phẩm, nhưng **chưa có trang** — theo đúng yêu cầu dừng lại sau
Login + Dashboard.
"# residenthub" 
