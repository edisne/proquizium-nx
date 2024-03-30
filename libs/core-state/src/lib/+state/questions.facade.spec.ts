import { TestBed } from '@angular/core/testing';
import { ActionsSubject } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { mockQuestion } from '@proquizium/testing';

import { QuestionsActions } from './questions.actions';
import { QuestionsFacade } from './questions.facade';
import { initialQuestionsState } from './questions.reducer';

describe('QuestionsFacade', () => {
  let facade: QuestionsFacade;
  let store: MockStore;

  const mockActionsSubject = new ActionsSubject();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuestionsFacade,
        provideMockStore({ initialState: initialQuestionsState }),
        { provide: ActionsSubject, useValue: mockActionsSubject },
      ],
    });

    facade = TestBed.inject(QuestionsFacade);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  describe('should dispatch', () => {
    it('select on select(question.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.selectQuestion(mockQuestion.id);

      const action = QuestionsActions.selectQuestion({
        selectedId: mockQuestion.id,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadQuestions on loadQuestions()', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadQuestions();

      const action = QuestionsActions.loadQuestions();

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadQuestion on loadQuestion(question.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadQuestion(mockQuestion.id);

      const action = QuestionsActions.loadQuestion({
        questionId: mockQuestion.id,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('createQuestion on createQuestion(question)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.createQuestion(mockQuestion);

      const action = QuestionsActions.createQuestion({
        question: mockQuestion,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('updateQuestion on updateQuestion(question)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.updateQuestion(mockQuestion);

      const action = QuestionsActions.updateQuestion({
        question: mockQuestion,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('delete on delete(model)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.deleteQuestion(mockQuestion);

      const action = QuestionsActions.deleteQuestion({
        question: mockQuestion,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
