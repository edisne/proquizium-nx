import { Question } from '@proquizium/api-interfaces';
import { mockQuestion } from '@proquizium/testing';

import {
  questionsAdapter,
  QuestionsState,
  initialQuestionsState,
} from './questions.reducer';
import * as QuestionsSelectors from './questions.selectors';

describe('Questions Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getQuestionsId = (question: Question) => question['id'];
  const createQuestion = (id: number) =>
    ({ ...mockQuestion, id: id }) as Question;

  let state: QuestionsState;

  beforeEach(() => {
    state = questionsAdapter.setAll(
      [createQuestion(1), createQuestion(2), createQuestion(3)],
      {
        ...initialQuestionsState,
        selectedId: 2,
        error: ERROR_MSG,
        loaded: true,
      },
    );
  });

  describe('Questions Selectors', () => {
    it('getAllQuestions() should return the list of Questions', () => {
      const results = QuestionsSelectors.getAllQuestions.projector(state);
      const selId = getQuestionsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe(2);
    });

    it('getSelected() should return the selected schema', () => {
      const result = QuestionsSelectors.getSelectedQuestion.projector(
        state.entities,
        state.selectedId,
      );
      const selId = getQuestionsId(result as Question);

      expect(selId).toBe(2);
    });

    it("getQuestionsLoaded() should return the current 'loaded' status", () => {
      const result = QuestionsSelectors.getQuestionsLoaded.projector(state);

      expect(result).toBe(true);
    });

    it("getQuestionsError() should return the current 'error' state", () => {
      const result = QuestionsSelectors.getQuestionsError.projector(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
