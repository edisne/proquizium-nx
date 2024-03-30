import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Question } from '@proquizium/api-interfaces';
import { QuestionsService } from '@proquizium/core-data';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { QuestionsActions } from './questions.actions';

export const loadQuestions = createEffect(
  (actions$ = inject(Actions), questionsService = inject(QuestionsService)) => {
    return actions$.pipe(
      ofType(QuestionsActions.loadQuestions),
      exhaustMap(() =>
        questionsService.all().pipe(
          map((questions: Question[]) =>
            QuestionsActions.loadQuestionsSuccess({ questions }),
          ),
          catchError((error) =>
            of(QuestionsActions.loadQuestionsFailure({ error })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);

export const loadQuestion = createEffect(
  (actions$ = inject(Actions), questionsService = inject(QuestionsService)) => {
    return actions$.pipe(
      ofType(QuestionsActions.loadQuestion),
      exhaustMap((action, value) => {
        return questionsService.find(action.questionId).pipe(
          map((question: Question) =>
            QuestionsActions.loadQuestionSuccess({ question }),
          ),
          catchError((error) =>
            of(QuestionsActions.loadQuestionFailure({ error })),
          ),
        );
      }),
    );
  },
  { functional: true },
);

export const createQuestion = createEffect(
  (actions$ = inject(Actions), questionsService = inject(QuestionsService)) => {
    return actions$.pipe(
      ofType(QuestionsActions.createQuestion),
      exhaustMap((action) => {
        return questionsService.create(action.question).pipe(
          map((question: any) =>
            QuestionsActions.createQuestionSuccess({ question }),
          ),
          catchError((error) =>
            of(QuestionsActions.createQuestionFailure({ error })),
          ),
        );
      }),
    );
  },
  { functional: true },
);

export const updateQuestion = createEffect(
  (actions$ = inject(Actions), questionsService = inject(QuestionsService)) => {
    return actions$.pipe(
      ofType(QuestionsActions.updateQuestion),
      exhaustMap((action) => {
        return questionsService.update(action.question).pipe(
          map((question: any) =>
            QuestionsActions.updateQuestionSuccess({ question }),
          ),
          catchError((error) =>
            of(QuestionsActions.updateQuestionFailure({ error })),
          ),
        );
      }),
    );
  },
  { functional: true },
);

export const deleteQuestion = createEffect(
  (actions$ = inject(Actions), questionsService = inject(QuestionsService)) => {
    return actions$.pipe(
      ofType(QuestionsActions.deleteQuestion),
      exhaustMap((action) => {
        return questionsService.delete(action.question).pipe(
          map((question: any) =>
            QuestionsActions.deleteQuestionSuccess({ question }),
          ),
          catchError((error) =>
            of(QuestionsActions.deleteQuestionFailure({ error })),
          ),
        );
      }),
    );
  },
  { functional: true },
);
