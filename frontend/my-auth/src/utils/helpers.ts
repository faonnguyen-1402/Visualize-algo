import { Exercise, ActivityDay } from '../types/user';

export const generateHeatmapDays = (exercises: Exercise[]): ActivityDay[] => {
  const today = new Date('2025-05-12');
  const activityMap = new Map<string, number>();

  exercises.forEach((ex) => {
    const count = activityMap.get(ex.completedDate) || 0;
    activityMap.set(ex.completedDate, count + 1);
  });

  const days: ActivityDay[] = [];
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const count = activityMap.get(dateStr) || 0;
    days.push({ date: dateStr, count });
  }
  return days;
};