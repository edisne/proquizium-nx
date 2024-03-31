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

import { RootStoreConfig } from '@ngrx/store';

const STORE_NAME = 'proquizium-questions-store';
const storeConfig: RootStoreConfig<any, any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictActionSerializability: true,
    strictStateImmutability: true,
    strictStateSerializability: true,
  },
};
