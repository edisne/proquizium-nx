import { createSelector } from '@ngrx/store';
import { getQuestionsState } from './state';
import { QuestionsState, questionsAdapter } from './questions.reducer';

const { selectIds, selectEntities, selectAll, selectTotal } =
  questionsAdapter.getSelectors();

const getQuestionsSlice = createSelector(
  getQuestionsState,
  (state) => state.questions,
);

export const getQuestionIds = createSelector(getQuestionsSlice, selectIds);
export const getQuestionsEntities = createSelector(
  getQuestionsSlice,
  selectEntities,
);
export const getAllQuestions = createSelector(getQuestionsSlice, selectAll);
export const getQuestionsTotal = createSelector(getQuestionsSlice, selectTotal);
export const getSelectedQuestionId = createSelector(
  getQuestionsSlice,
  (state: QuestionsState) => state.selectedId,
);

export const getQuestionsLoaded = createSelector(
  getQuestionsSlice,
  (state: QuestionsState) => state.loaded,
);

export const getQuestionsError = createSelector(
  getQuestionsSlice,
  (state: QuestionsState) => state.error,
);

export const getSelectedQuestion = createSelector(
  getQuestionsEntities,
  getSelectedQuestionId,
  (entities, selectedId) => selectedId && entities[selectedId],
);
