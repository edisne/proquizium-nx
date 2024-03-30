import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromQuestions from './+state/state';

export const questionsRoutes: Route[] = [
  {
    providers: [
      provideState(fromQuestions.QUESTIONS_FEATURE_KEY, fromQuestions.reducers),
      provideEffects(),
    ],
  },
];
