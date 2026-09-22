import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  newTitle = '';
  newDescription = '';
  loading = false;
  error = '';

  today = new Date();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  get completedCount(): number {
    return this.todos.filter((t) => t.completed).length;
  }

  get progressPercent(): number {
    return this.todos.length ? (this.completedCount / this.todos.length) * 100 : 0;
  }

  trackByTodoId(_index: number, todo: Todo): number | string {
    return todo.id ?? todo.title;
  }

  fetchTodos(): void {
    this.loading = true;
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not reach the API. Is the backend running on port 8000?';
        this.loading = false;
      },
    });
  }

  addTodo(): void {
    const title = this.newTitle.trim();
    if (!title) return;

    this.todoService
      .addTodo({ title, description: this.newDescription.trim() || undefined })
      .subscribe((todo) => {
        this.todos.unshift(todo);
        this.newTitle = '';
        this.newDescription = '';
      });
  }

  toggleTodo(todo: Todo): void {
    if (!todo.id) return;
    this.todoService.updateTodo(todo.id, { completed: !todo.completed }).subscribe((updated) => {
      todo.completed = updated.completed;
    });
  }

  deleteTodo(todo: Todo): void {
    if (!todo.id) return;
    this.todoService.deleteTodo(todo.id).subscribe(() => {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
    });
  }
}
