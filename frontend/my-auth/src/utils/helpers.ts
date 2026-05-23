import { Exercise, ActivityDay } from '../types/user';

// export const generateHeatmapDays = (exercises: any[]) => {

//   const days = [];

//   const today = new Date();

//   for (let i = 370; i >= 0; i--) {

//     const date = new Date();

//     date.setDate(today.getDate() - i);

//     const dateString = date
//       .toISOString()
//       .split('T')[0];

//     const count = exercises.filter((exercise) => {

//       return (
//         exercise.completedAt === dateString
//       );

//     }).length;

//     days.push({
//       date: dateString,
//       count,
//     });
//   }

//   return days;
// };

export const generateHeatmapDays = (completedList: any[]) => {
  const countsByDate: Record<string, number> = {};

  // Gom nhóm dữ liệu từ danh sách bài đã hoàn thành
  if (Array.isArray(completedList)) {
    completedList.forEach((item) => {
      // Dựa vào dữ liệu bạn gửi, trường thời gian là 'createdAt'
      if (item && item.createdAt) {
        const dateKey = item.createdAt.split('T')[0];
        countsByDate[dateKey] = (countsByDate[dateKey] || 0) + 1;
      }
    });
  }

  // Tạo mảng 371 ngày
  const days = [];
  const today = new Date();
  for (let i = 370; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dateString = date.toISOString().split('T')[0];

    days.push({
      date: dateString,
      count: countsByDate[dateString] || 0,
    });
  }
  return days;
};