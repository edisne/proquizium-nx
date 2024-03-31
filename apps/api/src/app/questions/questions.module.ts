import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Question } from './entities/question.entity';
import { Condition } from './entities/condition.entity';
import { Option } from './entities/option.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Question, Option, Condition])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
