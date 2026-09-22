
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';

const API_URL = '/api/todos';

@Injectable({ providedIn: 'root' })
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(API_URL);
  }

  addTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>(API_URL, todo);
  }

  updateTodo(id: number, changes: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${API_URL}/${id}`, changes);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}

