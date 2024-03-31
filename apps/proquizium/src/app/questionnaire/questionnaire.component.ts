import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Question } from '@proquizium/api-interfaces';
import { PanelModule } from 'primeng/panel';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import { QuestionsFacade } from '@proquizium/questions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [PanelModule, AsyncPipe, QuestionComponent, JsonPipe],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnaireComponent implements OnInit {
  private readonly questionsFacade = inject(QuestionsFacade);

  questions$: Observable<Question[]> = this.questionsFacade.allQuestions$;

  ngOnInit(): void {
    this.reset();
  }

  reset() {
    this.loadQuestions();
    this.questionsFacade.resetSelectedQuestion();
  }

  selectQuestion(question: Question) {
    this.questionsFacade.selectQuestion(question.id);
  }

  loadQuestions() {
    this.questionsFacade.loadQuestions();
  }

  saveQuestion(question: Question) {
    this.questionsFacade.saveQuestion(question);
  }

  deleteQuestion(question: Question) {
    this.questionsFacade.deleteQuestion(question);
  }

  onUserAnswer() {
    console.log('USER ANSWERED');
  }
}
