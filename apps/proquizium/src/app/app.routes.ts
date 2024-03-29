import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./questionnaire/questionnaire.component').then(
        (c) => c.QuestionnaireComponent,
      ),
  },
];
