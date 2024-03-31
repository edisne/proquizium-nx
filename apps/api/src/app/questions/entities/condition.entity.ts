import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity({ name: 'conditions' })
export class Condition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  conditionalQuestion: number;

  @Column({ type: 'integer', array: true, nullable: true })
  value: number[];

  @ManyToOne(() => Question, (question) => question.options, {
    onDelete: 'SET NULL',
  })
  question: Question;
}
