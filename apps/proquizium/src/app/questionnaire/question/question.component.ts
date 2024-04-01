import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Option, Question } from '@proquizium/api-interfaces';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { QuestionsFacade } from '@proquizium/questions';
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
    DropdownModule,
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class QuestionComponent {
  private readonly questionsFacade = inject(QuestionsFacade);

  @Input() question: Question | undefined;
  @Output() userAnswer: EventEmitter<Question> = new EventEmitter<Question>();

  onSingleSelect(event: DropdownChangeEvent) {
    if (this.question) {
      const updatedQuestion = {
        ...this.question,
        answer: event.value.id,
      };
      this.userAnswer.emit(updatedQuestion);
    }
  }

  onMultiSelect($event: MultiSelectChangeEvent) {
    if (this.question) {
      const updatedQuestion = {
        ...this.question,
        answer: [...$event.value.map((option: Option) => option.id)],
      };
      console.log('Updated question', updatedQuestion.answer);

      this.userAnswer.emit(updatedQuestion);
    }
  }

  getOptionName(selectedValue: number | number[]) {
    if (this.question?.options) {
      const option = this.question.options.find(
        (opt) => opt.id === selectedValue,
      );
      return option ? option.verbose_name : '';
    }
    return '';
  }

  identify(_: any, item: Option) {
    return item.id;
  }
}
