import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Question } from '@proquizium/api-interfaces';

import { QuestionsActions } from './questions.actions';

export interface QuestionsState extends EntityState<Question> {
  selectedId?: number | undefined;
  error?: string | null;
  loaded: boolean;
}

export const questionsAdapter: EntityAdapter<Question> =
  createEntityAdapter<Question>();

export const initialQuestionsState: QuestionsState =
  questionsAdapter.getInitialState({
    loaded: false,
  });

const onFailure = (state: QuestionsState, { error }: any) => ({
  ...state,
  error,
});

export const reducer = createReducer(
  initialQuestionsState,

  on(QuestionsActions.loadQuestions, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(QuestionsActions.loadQuestion, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),

  on(QuestionsActions.selectQuestion, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId }),
  ),
  on(QuestionsActions.resetSelectedQuestion, (state) =>
    Object.assign({}, state, { selectedId: null }),
  ),
  on(QuestionsActions.resetQuestions, (state) =>
    questionsAdapter.removeAll(state),
  ),

  on(QuestionsActions.loadQuestionsSuccess, (state, { questions }) =>
    questionsAdapter.setAll(questions, { ...state, loaded: true }),
  ),
  on(QuestionsActions.loadQuestionSuccess, (state, { question }) =>
    questionsAdapter.upsertOne(question, { ...state, loaded: true }),
  ),
  on(QuestionsActions.createQuestionSuccess, (state, { question }) =>
    questionsAdapter.addOne(question, state),
  ),
  on(QuestionsActions.updateQuestionSuccess, (state, { question }) =>
    questionsAdapter.updateOne({ id: question.id, changes: question }, state),
  ),
  on(QuestionsActions.deleteQuestionSuccess, (state, { question }) =>
    questionsAdapter.removeOne(question?.id ?? '', state),
  ),

  on(
    QuestionsActions.loadQuestionsFailure,
    QuestionsActions.loadQuestionFailure,
    QuestionsActions.createQuestionFailure,
    QuestionsActions.createQuestionFailure,
    QuestionsActions.createQuestionFailure,
    QuestionsActions.updateQuestionFailure,
    QuestionsActions.deleteQuestionFailure,
    onFailure,
  ),
);
