import { Option } from '../entities/option.entity';
import { Condition } from '../entities/condition.entity';

export class CreateQuestionDto {
  id: number;
  sort_id: number;
  title: string;
  type: string;
  options?: Option[];
  condition: Condition[] | null;
  is_triggered: boolean;
  answer?: number[] | number;
}
