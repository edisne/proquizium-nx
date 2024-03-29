import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Option, Question } from '@proquizium/api-interfaces';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SingleChoiceComponent } from '../single-choice/single-choice.component';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    AsyncPipe,
    InputTextModule,
    FormsModule,
    MultiSelectModule,
    InputTextareaModule,
    CommonModule,
    SingleChoiceComponent,
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class QuestionComponent {
  @Input() question: Question | undefined;
  @Output() userAnswer: EventEmitter<Question> = new EventEmitter<Question>();

  onSingleSelect() {
    this.userAnswer.emit();
  }

  onOptionSelected($event: MultiSelectChangeEvent) {
    if (this.question) {
      this.question.answer = $event.value.map((option: Option) => option.id);
    }
    this.userAnswer.emit(this.question);
  }

  identify(_: any, item: Option) {
    return item.id;
  }
}
