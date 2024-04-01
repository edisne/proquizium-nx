import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Option } from './entities/option.entity';
import { Condition } from './entities/condition.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
    @InjectRepository(Condition)
    private conditionRepository: Repository<Condition>,
    private dataSource: DataSource,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newQuestion = queryRunner.manager.create(
        Question,
        createQuestionDto,
      );
      await queryRunner.manager.save(newQuestion);

      if (createQuestionDto.options && createQuestionDto.options.length > 0) {
        const options = createQuestionDto.options.map((option) =>
          queryRunner.manager.create(Option, {
            ...option,
            question: newQuestion,
          }),
        );
        await queryRunner.manager.save(options);
      }

      if (
        createQuestionDto.condition &&
        createQuestionDto.condition.length > 0
      ) {
        const conditions = createQuestionDto.condition.map((condition) =>
          queryRunner.manager.create(Condition, {
            ...condition,
            question: newQuestion,
          }),
        );
        await queryRunner.manager.save(conditions);
      }

      await queryRunner.commitTransaction();

      return await this.questionRepository.findOne({
        where: { id: newQuestion.id },
        relations: ['options', 'condition'],
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.questionRepository.find({
      relations: ['options', 'condition'],
    });
  }

  findOne(id: number) {
    return this.questionRepository.findOne({ where: { id } });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const update = await this.questionRepository.update(id, {
      answer: updateQuestionDto.answer,
    });
    await this.evaluate();
    return update;
  }

  remove(id: number) {
    return this.questionRepository.delete(id);
  }

  async evaluate() {
    const questions = await this.questionRepository.find({
      relations: ['options', 'condition'],
    });
    for (const question of questions) {
      if (question.condition) {
        question.is_triggered = question.condition.every((cond: Condition) => {
          const requiredQuestion = questions.find(
            (q: Question) => q.id === cond.conditionalQuestion,
          );
          if (!requiredQuestion) return false;
          const answer = requiredQuestion.answer;
          if (Array.isArray(cond.value) && cond.value.length > 1) {
            const sortedAnswer = Array.isArray(answer)
              ? [...answer].sort()
              : [];
            const sortedValue = [...cond.value].sort();

            return JSON.stringify(sortedAnswer) === JSON.stringify(sortedValue);
          } else {
            return Number(answer) === Number(cond.value);
          }
        });
      } else {
        question.is_triggered = true;
      }
      await this.questionRepository.save(question);
    }
  }
}
