import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '@proquizium/api-interfaces';

const API_URL = 'http://localhost:3000';

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
    return this.http.post(this.getUrl(), question);
  }

  update(question: Question) {
    return this.http.patch(this.getUrlWithId(question.id), question);
  }

  delete(question: Question) {
    return this.http.delete(this.getUrlWithId(question.id));
  }

  private getUrl() {
    return `${API_URL}/${this.model}`;
  }

  private getUrlWithId(id: number | undefined | null) {
    return `${this.getUrl()}/${id}`;
  }
}
