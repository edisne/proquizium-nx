import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Question } from '@proquizium/api-interfaces';
import { PanelModule } from 'primeng/panel';
import { AsyncPipe } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import { QuestionsService } from '../services/questions.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [PanelModule, AsyncPipe, QuestionComponent],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnaireComponent {
  private readonly questionsService = inject(QuestionsService);
  questions$: Observable<Question[]> = this.questionsService.questions$;

  onUserAnswer() {
    this.questionsService.evaluate();
  }
}
