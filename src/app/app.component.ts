import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TodoComponent } from './components/todo/todo.component';
import { Todo } from './types/todo';
import { TodoFormComponent } from "./components/todo-form/todo-form.component";

const todos = [
  { id: 1, title: 'Learn Angular', completed: false },
  { id: 2, title: 'Build a Todo App', completed: true },
  { id: 3, title: 'Master TypeScript', completed: false }
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TodoComponent, TodoFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {
  _todos: Todo[] = [];
  activeTodos: Todo[] = []

  get todos() {
    return this._todos
  }

  set todos ( todos: Todo[]) {
    if (todos === this._todos) {
      return
    }

    this._todos = todos
    this.activeTodos = this._todos.filter(todo => !todo.completed)
  }

  get activeTodosCount(): number {
    return this._todos.filter(todo => !todo.completed).length;
  }

  ngOnInit(): void {
    this._todos = todos
  }

  addTodo(newTitle: string) {
     const newTodo: Todo = {
      id: this._todos.length + 1,
      title: newTitle,
      completed: false
    }

    this._todos = [...this._todos, newTodo];
  }

  renameTodo(id: number, title: string) {
    this._todos = this._todos.map(todo => 
      todo.id === id ? { ...todo, title } : todo
    );
  }

  toggleTodo(id: number) {
    this._todos = this._todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  deleteTodo(id: number) { 
    this._todos = this._todos.filter(todo => todo.id !== id);
  }
}
