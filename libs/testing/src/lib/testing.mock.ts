/* eslint-disable @typescript-eslint/no-empty-function */
import { Question } from '@proquizium/api-interfaces';
import { of } from 'rxjs';

export const mockQuestionFacade = {
  loadChallenges: () => {},
  selectChallenge: () => {},
  deleteChallenge: () => {},
  updateChallenge: () => {},
  createChallenge: () => {},
};

export const mockQuestionsService = {
  all: () => of([]),
  find: () => of({ ...mockQuestion }),
  create: () => of({ ...mockQuestion }),
  update: () => of({ ...mockQuestion }),
  delete: () => of({ ...mockQuestion }),
};

export const mockQuestion: Question = {
  id: 1,
  sort_id: 1,
  title: 'mock',
  type: 'single_choice',
  condition: null,
  is_triggered: true,
};

export const mockEmptyQuestion: Question = {
  id: 1,
  sort_id: 1,
  title: 'mock',
  type: 'single_choice',
  condition: null,
  is_triggered: true,
};
