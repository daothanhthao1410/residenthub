// Toàn bộ dữ liệu trong file này là dữ liệu giả (mock),
// dùng để dựng giao diện trước khi có backend thật.

export const MOCK_USERS = [
  {
    id: 'u-001',
    email: 'admin@demo.com',
    password: '123456',
    role: 'company_admin',
    name: 'Nguyễn Hoàng Anh',
    companyName: 'Sunrise Property Management',
    avatarInitials: 'HA',
  },
  {
    id: 'u-002',
    email: 'resident@demo.com',
    password: '123456',
    role: 'resident',
    name: 'Trần Thảo My',
    unitCode: 'A-203',
    buildingName: 'Sunrise Apartment A',
    avatarInitials: 'TM',
  },
]

export const MOCK_STATS = {
  totalBuildings: 4,
  totalRooms: 128,
  occupiedRooms: 104,
  totalResidents: 141,
  monthlyRevenue: 486_500_000, // VND
  overdueInvoices: 7,
  openSupportRequests: 5,
}

export const MOCK_BUILDINGS = [
  { id: 'b-01', name: 'Sunrise Apartment A', rooms: 40, occupied: 34, address: 'Q. Cầu Giấy, Hà Nội' },
  { id: 'b-02', name: 'Sunrise Apartment B', rooms: 36, occupied: 30, address: 'Q. Nam Từ Liêm, Hà Nội' },
  { id: 'b-03', name: 'Green Homes Mini', rooms: 28, occupied: 22, address: 'Q. Thanh Xuân, Hà Nội' },
  { id: 'b-04', name: 'Riverside Rooms', rooms: 24, occupied: 18, address: 'Q. Hai Bà Trưng, Hà Nội' },
]

export const MOCK_RECENT_INVOICES = [
  { id: 'INV-2026-0891', unit: 'A-203', resident: 'Trần Thảo My', amount: 4_200_000, status: 'paid', dueDate: '2026-08-05' },
  { id: 'INV-2026-0892', unit: 'A-114', resident: 'Lê Minh Quân', amount: 3_800_000, status: 'overdue', dueDate: '2026-08-05' },
  { id: 'INV-2026-0893', unit: 'B-207', resident: 'Phạm Thu Hà', amount: 4_500_000, status: 'pending', dueDate: '2026-08-10' },
  { id: 'INV-2026-0894', unit: 'C-102', resident: 'Vũ Đức Anh', amount: 3_950_000, status: 'paid', dueDate: '2026-08-05' },
  { id: 'INV-2026-0895', unit: 'D-306', resident: 'Đỗ Ngọc Lan', amount: 4_100_000, status: 'overdue', dueDate: '2026-08-05' },
]

export const MOCK_SUPPORT_REQUESTS_ADMIN = [
  { id: 'SR-1042', unit: 'A-203', title: 'Vòi nước phòng bếp bị rò rỉ', priority: 'high', status: 'open', createdAt: '2026-08-24' },
  { id: 'SR-1041', unit: 'B-115', title: 'Đèn hành lang tầng 3 không sáng', priority: 'medium', status: 'in_progress', createdAt: '2026-08-23' },
  { id: 'SR-1040', unit: 'C-208', title: 'Điều hòa kêu to bất thường', priority: 'medium', status: 'open', createdAt: '2026-08-22' },
  { id: 'SR-1039', unit: 'A-107', title: 'Yêu cầu đổi khóa cửa chính', priority: 'low', status: 'resolved', createdAt: '2026-08-20' },
  { id: 'SR-1038', unit: 'D-301', title: 'Wifi khu vực sảnh chập chờn', priority: 'high', status: 'in_progress', createdAt: '2026-08-19' },
]

// Dữ liệu riêng cho tài khoản resident demo (đồng bộ với u-002)
export const MOCK_RESIDENT_UNIT = {
  unitCode: 'A-203',
  buildingName: 'Sunrise Apartment A',
  floor: 2,
  area: 32, // m2
  contract: {
    id: 'HD-2026-0203',
    startDate: '2025-09-01',
    endDate: '2026-08-31',
    monthlyRent: 4_200_000,
    deposit: 4_200_000,
    status: 'active',
  },
}

export const MOCK_RESIDENT_INVOICES = [
  { id: 'INV-2026-0891', period: 'Tháng 8/2026', amount: 4_200_000, status: 'paid', dueDate: '2026-08-05' },
  { id: 'INV-2026-0879', period: 'Tháng 7/2026', amount: 4_150_000, status: 'paid', dueDate: '2026-07-05' },
  { id: 'INV-2026-0867', period: 'Tháng 6/2026', amount: 4_180_000, status: 'paid', dueDate: '2026-06-05' },
  { id: 'INV-2026-0855', period: 'Tháng 9/2026', amount: 4_200_000, status: 'pending', dueDate: '2026-09-05' },
]

export const MOCK_RESIDENT_SUPPORT_REQUESTS = [
  { id: 'SR-1042', title: 'Vòi nước phòng bếp bị rò rỉ', status: 'open', createdAt: '2026-08-24' },
  { id: 'SR-1020', title: 'Bóng đèn phòng ngủ bị cháy', status: 'resolved', createdAt: '2026-07-10' },
]

export const MOCK_NOTIFICATIONS = [
  { id: 'n-1', title: 'Hóa đơn tháng 9 đã được phát hành', time: '2 giờ trước', unread: true },
  { id: 'n-2', title: 'Yêu cầu SR-1042 đã được tiếp nhận', time: '1 ngày trước', unread: true },
  { id: 'n-3', title: 'Nhắc lịch bảo trì điều hòa toàn tòa nhà', time: '3 ngày trước', unread: false },
]
