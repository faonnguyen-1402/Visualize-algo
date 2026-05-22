import { User, Exercise } from '../types/user';

export const mockUser: User = {
  id: 1, // Thêm id để khớp với Interface
  username: 'Nguyễn Văn A', // Đổi từ name sang username
  email: 'nguyenvana@example.com', // Thêm email để khớp với Interface
  image: '',
  joinyear: 2025, // Đổi số 9 thành năm hợp lệ (kiểu number)
};

export const mockExercises: Exercise[] = [
  { id: '1', title: 'Tao', difficulty: 'Easy', completedDate: '2025-05-11' },
  { id: '8', title: 'Lười', difficulty: 'Easy', completedDate: '2025-05-10' },
  { id: '3', title: 'Quá', difficulty: 'Trung bình', completedDate: '2025-05-11' },
  { id: '6', title: 'Hihi', difficulty: 'Khó', completedDate: '2025-04-25' },
];