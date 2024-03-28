import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Option, Question } from '@proquizium/api-interfaces';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    AsyncPipe,
    InputTextModule,
    FormsModule,
    DropdownModule,
    MultiSelectModule,
    InputTextareaModule,
    CommonModule,
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class QuestionComponent {
  @Input() question: Question | undefined;

  identify(_: any, item: Option) {
    return item.id;
  }
}
