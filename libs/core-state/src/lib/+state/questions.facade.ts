import { Injectable, inject } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Question } from '@proquizium/api-interfaces';
import { QuestionsActions } from './questions.actions';
import * as QuestionsSelectors from './questions.selectors';

@Injectable({
  providedIn: 'root',
})
export class QuestionsFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(QuestionsSelectors.getQuestionsLoaded));
  allQuestions$ = this.store.pipe(select(QuestionsSelectors.getAllQuestions));
  selectedQuestion$ = this.store.pipe(
    select(QuestionsSelectors.getSelectedQuestion),
  );

  resetSelectedQuestion() {
    this.dispatch(QuestionsActions.resetSelectedQuestion());
  }

  selectQuestion(selectedId: number) {
    this.dispatch(QuestionsActions.selectQuestion({ selectedId }));
  }

  loadQuestions() {
    this.dispatch(QuestionsActions.loadQuestions());
  }

  loadQuestion(questionId: number) {
    this.dispatch(QuestionsActions.loadQuestion({ questionId }));
  }

  saveQuestion(question: Question) {
    if (question.id) {
      this.updateQuestion(question);
    } else {
      this.createQuestion(question);
    }
  }

  createQuestion(question: Question) {
    this.dispatch(QuestionsActions.createQuestion({ question }));
  }

  updateQuestion(question: Question) {
    this.dispatch(QuestionsActions.updateQuestion({ question }));
  }

  deleteQuestion(question: Question) {
    this.dispatch(QuestionsActions.deleteQuestion({ question }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
