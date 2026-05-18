// export type Algorithm = {
//   id: id;
//   name: string;
//   title: string,
//   slug: string,
//   category: string;
//   difficulty: string;
//   description: string;
//   timeComplexity: string;
//   spaceComplexity: string;
//   pseudocode: string;
//   code: string;
// }

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD"
}

export interface Algorithm {
  id: number;
  name: string;
  title: string;
  slug: string;
  description: string;
  pseudoCode: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  difficulty: Difficulty;
  categoryId: number;
  category: {
    id: number;
    name: string;
    description?: string;
  };
}