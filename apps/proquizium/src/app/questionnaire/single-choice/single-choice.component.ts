import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '@proquizium/api-interfaces';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-single-choice',
  standalone: true,
  imports: [DropdownModule, CommonModule],
  templateUrl: './single-choice.component.html',
  styleUrl: './single-choice.component.css',
})
export class SingleChoiceComponent implements OnInit {
  @Input() question: Question | undefined;
  @Output() userAnswer: EventEmitter<Question> = new EventEmitter<Question>();

  ngOnInit(): void {
    console.log(this.question);
  }
  onOptionChange(event: DropdownChangeEvent) {
    if (this.question) {
      this.question.answer = event.value.id;
      this.userAnswer.emit();
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
}
