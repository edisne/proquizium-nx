import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity({ name: 'options' })
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  verbose_name: string;

  @Column()
  value: string;

  @ManyToOne(() => Question, (question) => question.options, {
    onDelete: 'SET NULL',
  })
  question: Question;
}
