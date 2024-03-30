import { Question } from '@proquizium/api-interfaces';
import { mockQuestion, mockEmptyQuestion } from '@proquizium/testing';

import { QuestionsActions } from './questions.actions';
import {
  QuestionsState,
  initialQuestionsState,
  reducer,
} from './questions.reducer';

describe('Questions Reducer', () => {
  let questions: Question[];

  beforeEach(() => {
    questions = [
      { ...mockQuestion, id: 0 },
      { ...mockQuestion, id: 1 },
      { ...mockQuestion, id: 2 },
    ];
  });

  describe('valid Questions actions', () => {
    it('loadQuestions should set loaded to false', () => {
      const action = QuestionsActions.loadQuestions();
      const expectedState = {
        ...initialQuestionsState,
        error: null,
      };

      const result: QuestionsState = reducer(initialQuestionsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadQuestionsSuccess should set the list of known Questions', () => {
      const action = QuestionsActions.loadQuestionsSuccess({ questions });
      const expectedState = {
        ...initialQuestionsState,
        loaded: true,
        entities: {
          0: questions[0],
          1: questions[1],
          2: questions[2],
        },
        ids: questions.map((question) => question.id),
      };

      const result: QuestionsState = reducer(initialQuestionsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadQuestionsFailure should set error to error', () => {
      const error = new Error();
      const action = QuestionsActions.loadQuestionsFailure({ error });
      const expectedState = {
        ...initialQuestionsState,
        error,
      };

      const result: QuestionsState = reducer(initialQuestionsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadQuestion should set loaded to false', () => {
      const action = QuestionsActions.loadQuestion({
        questionId: mockQuestion.id,
      });
      const expectedState = {
        ...initialQuestionsState,
        loaded: false,
        error: null,
      };

      const result: QuestionsState = reducer(initialQuestionsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadQuestionSuccess should set loaded to true', () => {
      const action = QuestionsActions.loadQuestionSuccess({
        question: mockQuestion,
      });
      const expectedState = {
        ...initialQuestionsState,
        loaded: true,
        entities: {
          0: mockQuestion,
        },
        ids: [mockQuestion.id],
      };

      const result: QuestionsState = reducer(initialQuestionsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadQuestionFailure should set error to error', () => {
      const error = new Error();
      const action = QuestionsActions.loadQuestionFailure({ error });
      const expectedState = {
        ...initialQuestionsState,
        error,
      };

      const result: QuestionsState = reducer(initialQuestionsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('updateQuestionSuccess should modify question', () => {
      const prepAction = QuestionsActions.loadQuestionSuccess({
        question: { ...mockEmptyQuestion, id: mockQuestion.id },
      });
      const prepState: QuestionsState = reducer(
        initialQuestionsState,
        prepAction,
      );

      const expectedState = {
        ...initialQuestionsState,
        loaded: true,
        entities: {
          0: mockQuestion,
        },
        ids: [mockQuestion.id],
      };

      const action = QuestionsActions.updateQuestionSuccess({
        question: mockQuestion,
      });
      const result: QuestionsState = reducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('updateQuestionFailure should set error to error', () => {
      const error = new Error();
      const action = QuestionsActions.updateQuestionFailure({ error });
      const expectedState = {
        ...initialQuestionsState,
        error: error,
      };

      const result: QuestionsState = reducer(initialQuestionsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('createQuestionSuccess should add question', () => {
      const action = QuestionsActions.createQuestionSuccess({
        question: mockQuestion,
      });
      const expectedState = {
        ...initialQuestionsState,
        loaded: false,
        entities: {
          0: mockQuestion,
        },
        ids: [mockQuestion.id],
      };

      const result: QuestionsState = reducer(initialQuestionsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('createQuestionFailure should set error to error', () => {
      const error = new Error();
      const action = QuestionsActions.createQuestionFailure({ error });
      const expectedState = {
        ...initialQuestionsState,
        error,
      };

      const result: QuestionsState = reducer(initialQuestionsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteQuestionSuccess should add question', () => {
      const prepAction = QuestionsActions.loadQuestionSuccess({
        question: mockQuestion,
      });
      const prepState: QuestionsState = reducer(
        initialQuestionsState,
        prepAction,
      );

      const expectedState = {
        ...initialQuestionsState,
        loaded: true,
      };

      const action = QuestionsActions.deleteQuestionSuccess({
        question: mockQuestion,
      });
      const result: QuestionsState = reducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteQuestionFailure should set error to error', () => {
      const error = new Error();
      const action = QuestionsActions.deleteQuestionFailure({ error });
      const expectedState = {
        ...initialQuestionsState,
        error,
      };

      const result: QuestionsState = reducer(initialQuestionsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('selectQuestion should set selectedId', () => {
      const action = QuestionsActions.selectQuestion({
        selectedId: mockQuestion.id,
      });
      const expectedState = {
        ...initialQuestionsState,
        selectedId: mockQuestion.id,
      };

      const result: QuestionsState = reducer(initialQuestionsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('resetSelectedQuestion should reset selectedId', () => {
      const prepAction = QuestionsActions.selectQuestion({
        selectedId: mockQuestion.id,
      });
      const prepState = reducer(initialQuestionsState, prepAction);

      const action = QuestionsActions.resetSelectedQuestion();
      const expectedState = {
        ...initialQuestionsState,
        selectedId: null,
      };

      const result: QuestionsState = reducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('resetQuestions should reset questions', () => {
      const prepAction = QuestionsActions.loadQuestionsSuccess({
        questions,
      });
      const prepState: QuestionsState = reducer(
        initialQuestionsState,
        prepAction,
      );

      const expectedState = {
        ...initialQuestionsState,
        loaded: true,
      };

      const action = QuestionsActions.resetQuestions();
      const result: QuestionsState = reducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result: QuestionsState = reducer(initialQuestionsState, action);

      expect(result).toBe(initialQuestionsState);
    });
  });
});
