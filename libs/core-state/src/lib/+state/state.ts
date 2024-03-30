import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromQuestions from './questions.reducer';

export const QUESTIONS_FEATURE_KEY = 'questions';

export interface State {
  questions: fromQuestions.QuestionsState;
}

export const reducers: ActionReducerMap<State> = {
  questions: fromQuestions.reducer,
};

export const getQuestionsState = createFeatureSelector<State>(
  QUESTIONS_FEATURE_KEY,
);
