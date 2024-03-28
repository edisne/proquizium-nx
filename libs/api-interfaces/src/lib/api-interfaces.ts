export interface Automation {
  id: number;
  sort_id: number;
  title: string;
  type: string;
  options?: Option[];
  condition: Condition[] | null;
  is_triggered: boolean;
  answer: number[] | number;
}

export interface Condition {
  question: number;
  value: number[] | number;
}

export interface Option {
  id: number;
  verbose_name: string;
  value: string;
}
