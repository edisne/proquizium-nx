import { Injectable } from '@angular/core';
import { Condition, Question } from '@proquizium/api-interfaces';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as data from '../../assets/data.json';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private questionsSubject = new BehaviorSubject<Question[]>([]);
  questions$ = this.questionsSubject.asObservable();

  constructor() {
    const questions = JSON.parse(JSON.stringify(data)).default as Question[];
    console.log(questions);

    this.questionsSubject.next(questions);
  }

  evaluate() {
    this.questions$.subscribe((questions: Question[]) => {
      questions.forEach((question) => {
        if (question.condition) {
          question.is_triggered = question.condition.every(
            (cond: Condition) => {
              const requiredQuestion = questions.find(
                (q: Question) => q.id === cond.question,
              );
              if (!requiredQuestion) return false;
              const answer = requiredQuestion.answer;
              if (Array.isArray(cond.value)) {
                const sortedAnswer = Array.isArray(answer)
                  ? [...answer].sort()
                  : [];
                const sortedValue = [...cond.value].sort();
                return (
                  JSON.stringify(sortedAnswer) === JSON.stringify(sortedValue)
                );
              } else {
                return answer === cond.value;
              }
            },
          );
        } else {
          question.is_triggered = true;
        }
      });
    });
  }
}
