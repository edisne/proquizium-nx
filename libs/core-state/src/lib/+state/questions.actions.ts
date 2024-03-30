import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Question } from '@proquizium/api-interfaces';

export const QuestionsActions = createActionGroup({
  source: 'Questions API',
  events: {
    'Select Question': props<{ selectedId: number }>(),
    'Reset Selected Question': emptyProps(),
    'Reset Questions': emptyProps(),
    'Load Questions': emptyProps(),
    'Load Questions Success': props<{ questions: Question[] }>(),
    'Load Questions Failure': props<{ error: Error }>(),
    'Load Question': props<{ questionId: number }>(),
    'Load Question Success': props<{ question: Question }>(),
    'Load Question Failure': props<{ error: Error }>(),
    'Create Question': props<{ question: Question }>(),
    'Create Question Success': props<{ question: Question }>(),
    'Create Question Failure': props<{ error: Error }>(),
    'Update Question': props<{ question: Question }>(),
    'Update Question Success': props<{ question: Question }>(),
    'Update Question Failure': props<{ error: Error }>(),
    'Delete Question': props<{ question: Question }>(),
    'Delete Question Success': props<{ question: Question }>(),
    'Delete Question Failure': props<{ error: Error }>(),
    'Delete Question Cancelled': emptyProps(),
    'Upsert Question': props<{ question: Question }>(),
    'Upsert Question Success': props<{ question: Question }>(),
    'Upsert Question Failure': props<{ error: Error }>(),
  },
});
