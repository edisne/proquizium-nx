import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as QuestionsActions from './questions.actions';
import { QuestionsEffects } from './questions.effects';

describe('QuestionsEffects', () => {
  let actions: Observable<Action>;
  let effects: QuestionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        QuestionsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(QuestionsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: QuestionsActions.initQuestions() });

      const expected = hot('-a-|', {
        a: QuestionsActions.loadQuestionsSuccess({ questions: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
