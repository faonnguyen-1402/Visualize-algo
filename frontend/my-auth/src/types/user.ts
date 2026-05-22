export interface User {
  id: number;
  username: string;
  email: string;
  image?: string;    // Thêm nếu bạn có lưu ảnh
  joinyear?: number; // Thêm nếu bạn có lưu năm gia nhập
}

export interface Exercise {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Trung bình' | 'Khó';
  completedDate: string;
}

export interface ActivityDay {
  date: string;
  count: number;
}