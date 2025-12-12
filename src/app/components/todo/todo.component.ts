import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

const todos = [
  { id: 1, title: 'Learn Angular', completed: false },
  { id: 2, title: 'Build a Todo App', completed: true },
  { id: 3, title: 'Master TypeScript', completed: false },
];

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  editing = false;
  todos = todos;
  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  get title() {
    return this.todoForm.get('title') as FormControl;
  }

  get activeTodosCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  addTodo() {
    if (this.title.invalid) {
      return;
    }

    if (this.title.value.trim().length === 0) {
      return;
    }

    const newTodo: Todo = {
      id: this.todos.length + 1,
      title: this.title.value,
      completed: false,
    };

    this.todos.push(newTodo);
    this.title.reset();
  }
}
