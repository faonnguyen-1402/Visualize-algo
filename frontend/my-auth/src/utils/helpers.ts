import { Exercise, ActivityDay } from '../types/user';

export const generateHeatmapDays = (exercises: any[]) => {

  const days = [];

  const today = new Date();

  for (let i = 370; i >= 0; i--) {

    const date = new Date();

    date.setDate(today.getDate() - i);

    const dateString = date
      .toISOString()
      .split('T')[0];

    const count = exercises.filter((exercise) => {

      return (
        exercise.completedAt === dateString
      );

    }).length;

    days.push({
      date: dateString,
      count,
    });
  }

  return days;
};