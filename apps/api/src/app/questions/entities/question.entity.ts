import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Option } from './option.entity';
import { Condition } from './condition.entity';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sort_id: number;

  @Column()
  title: string;

  @Column()
  type: string;

  @OneToMany(() => Option, (option) => option.question)
  options?: Option[];

  @OneToMany(() => Condition, (condition) => condition.question, {
    nullable: true,
  })
  condition: Condition[];

  @Column()
  is_triggered: boolean;

  @Column({ type: 'jsonb', nullable: true })
  answer?: number[] | number;
}
