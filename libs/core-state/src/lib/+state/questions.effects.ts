import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Question } from '@proquizium/api-interfaces';
import { QuestionsService } from '@proquizium/core-data';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { QuestionsActions } from './questions.actions';
import { pessimisticUpdate } from '@nx/angular';

@Injectable()
export class QuestionsEffects {
  private actions$ = inject(Actions);
  private questionService = inject(QuestionsService);

  loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionsActions.loadQuestions),
      concatMap(() =>
        this.questionService.all().pipe(
          map((questions: Question[]) => {
            return QuestionsActions.loadQuestionsSuccess({ questions });
          }),
          catchError((error) =>
            of(QuestionsActions.loadQuestionsFailure({ error })),
          ),
        ),
      ),
    ),
  );

  loadQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionsActions.loadQuestion),
      switchMap(({ questionId }) =>
        this.questionService.find(questionId).pipe(
          map((question: Question) =>
            QuestionsActions.loadQuestionSuccess({ question }),
          ),
          catchError((error) =>
            of(QuestionsActions.loadQuestionFailure({ error })),
          ),
        ),
      ),
    ),
  );

  createQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionsActions.createQuestion),
      pessimisticUpdate({
        run: (action) =>
          this.questionService
            .create(action.question)
            .pipe(
              map((question: Question) =>
                QuestionsActions.createQuestionSuccess({ question }),
              ),
            ),
        onError: (action, error) =>
          QuestionsActions.createQuestionFailure({ error }),
      }),
    ),
  );

  updateQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionsActions.updateQuestion),
      pessimisticUpdate({
        run: (action) =>
          this.questionService
            .update(action.question)
            .pipe(
              concatMap((question: Question) => [
                QuestionsActions.updateQuestionSuccess({ question }),
                QuestionsActions.loadQuestions(),
              ]),
            ),
        onError: (action, error) =>
          QuestionsActions.updateQuestionFailure({ error }),
      }),
    ),
  );

  deleteQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionsActions.deleteQuestion),
      pessimisticUpdate({
        run: (action) =>
          this.questionService
            .delete(action.question)
            .pipe(
              map((question: Question) =>
                QuestionsActions.deleteQuestionSuccess({ question }),
              ),
            ),
        onError: (action, error) =>
          QuestionsActions.deleteQuestionFailure({ error }),
      }),
    ),
  );
}
