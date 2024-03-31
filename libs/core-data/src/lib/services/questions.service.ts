import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '@proquizium/api-interfaces';
import { tap } from 'rxjs';

const API_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  model = 'questions';

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Question[]>(this.getUrl());
  }

  find(id: number) {
    return this.http.get<Question>(this.getUrlWithId(id));
  }

  create(question: Question) {
    return this.http.post<Question>(this.getUrl(), question);
  }

  update(question: Question) {
    return this.http.patch<Question>(this.getUrlWithId(question.id), question);
  }

  delete(question: Question) {
    return this.http.delete<Question>(this.getUrlWithId(question.id));
  }

  private getUrl() {
    return `${API_URL}/${this.model}`;
  }

  private getUrlWithId(id: number | undefined | null) {
    return `${this.getUrl()}/${id}`;
  }
}
