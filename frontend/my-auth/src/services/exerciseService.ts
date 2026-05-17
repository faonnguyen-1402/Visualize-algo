export interface Exercise {
    id: string;
    title: string;
    slug: string;
    description: string;
    constraints: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    algorithm: {
        id: number;
        name: string; 
        slug: string;
        category?: {
            id: number;
            name: string; 
        };
  };
}

const API_URL = 'http://localhost:3001/exercises';

export const getExercises = async () => {
  const res = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Nếu API bài tập bắt buộc phải đăng nhập mới xem được, bạn mở dòng dưới này ra:
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
  });

  if (!res.ok) {
    throw new Error('Unable to retrieve the assignment list');
  }

  return res.json();
};

export const getExerciseDetail = async (slug: string, difficulty: string) => {
  // Gọi sang đúng cổng Backend NestJS (/exercise hoặc /exercises tùy theo cấu hình của bạn)
  const res = await fetch(`http://localhost:3001/exercise/${slug}/${difficulty}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error('Không thể tải thông tin chi tiết bài tập');
  }
  
  return res.json();
};