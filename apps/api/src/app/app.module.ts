import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { Option } from './questions/entities/option.entity';
import { Condition } from './questions/entities/condition.entity';
import { Question } from './questions/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'proquizium-db-do-user-16188267-0.c.db.ondigitalocean.com',
      port: 25060,
      username: 'doadmin',
      password: 'AVNS_pjHQyFs0vveF5aT0dZV',
      database: 'proquizium',
      entities: [Question, Option, Condition],
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
