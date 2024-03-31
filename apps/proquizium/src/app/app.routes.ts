import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromQuestions from '@proquizium/questions';
import { QuestionsFacade } from '@proquizium/questions';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./questionnaire/questionnaire.component').then(
        (c) => c.QuestionnaireComponent,
      ),
    providers: [
      provideState(fromQuestions.QUESTIONS_FEATURE_KEY, fromQuestions.reducers),
      provideEffects(fromQuestions.QuestionsEffects),
      QuestionsFacade,
    ],
  },
];
