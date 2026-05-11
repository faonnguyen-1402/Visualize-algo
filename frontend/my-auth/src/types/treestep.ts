export type StepType = "visit" | "compare" | "found" | "done";

export interface Step {
  type: StepType;

  // Tree specific
  activeNode?: string;
  visitedNodes?: string[];
  path?: string[];
  tree?: any;

  // Array specific
  indices?: number[];
  index?: number;
  array?: number[];

}