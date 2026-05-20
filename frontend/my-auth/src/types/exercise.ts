// src/types/exercise.ts

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

// Alias cho ExerciseSummary — dùng cho code cũ import Exercise
export interface Exercise {
  id: number;
  title: string;
  difficulty: Difficulty;
  slug: string;
}

export interface ExerciseSummary {
  id: number;
  title: string;
  difficulty: Difficulty;
  slug: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface ExerciseDetail {
  id: number;
  title: string;
  difficulty: Difficulty;
  slug: string;
  description?: string;
  starterCode?: string;
  testCases: TestCase[];
  algorithm: {
    name: string;
    slug: string;
  };
}