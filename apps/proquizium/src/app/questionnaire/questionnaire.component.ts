import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Question } from '@proquizium/api-interfaces';
import { QuestionsService } from '../services/questions.service';
import { PanelModule } from 'primeng/panel';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { QuestionComponent } from './question/question.component';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [PanelModule, AsyncPipe, QuestionComponent],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnaireComponent implements OnInit {
  questions$: Observable<Question[]> | undefined;
  private readonly questionService = inject(QuestionsService);

  ngOnInit(): void {
    this.questions$ = this.questionService.all();
  }
}
