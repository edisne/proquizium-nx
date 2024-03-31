import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { QuestionsFacade } from '@proquizium/questions';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [
    PanelModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    CheckboxModule,
    CommonModule,
    PanelModule,
    CardModule,
  ],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.css',
})
export class QuestionFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly questionsFacade = inject(QuestionsFacade);

  questionForm: FormGroup = this.fb.group({
    sort_id: [null],
    title: [''],
    type: [''],
    is_triggered: [false],
    options: this.fb.array([]),
    condition: this.fb.array([]),
  });

  onSubmit() {
    console.log(this.questionForm.value);
    this.questionsFacade.createQuestion(this.questionForm.value);
  }

  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  get condition(): FormArray {
    return this.questionForm.get('condition') as FormArray;
  }

  addOption() {
    this.options.push(
      this.fb.group({
        verbose_name: [''],
        value: [''],
      }),
    );
  }

  addCondition() {
    this.condition.push(
      this.fb.group({
        question: [''],
        value: [''],
      }),
    );
  }
}
