import { User, Exercise } from '../types/user';

export const mockUser: User = {
  name: 'Nguyễn Văn A',
  image: '',
  joinyear: '1836',
};

export const mockExercises: Exercise[] = [
  { id: '1', title: 'Tao', difficulty: 'Dễ', completedDate: '2025-05-11' },
  { id: '8', title: 'Lười', difficulty: 'Dễ', completedDate: '2025-05-10' },
  { id: '3', title: 'Quá', difficulty: 'Trung bình', completedDate: '2025-05-11' },
  { id: '6', title: 'Hihi', difficulty: 'Khó', completedDate: '2025-04-25' },
];