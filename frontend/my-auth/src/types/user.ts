export interface User {
  name: string;
  image: string;
  joinyear: string;
}

export interface Exercise {
  id: string;
  title: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  completedDate: string;
}

export interface ActivityDay {
  date: string;
  count: number;
}