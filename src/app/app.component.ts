import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TodoComponent } from './components/todo/todo.component';
import { Todo } from './types/todo';

const todos = [
  { id: 1, title: 'Learn Angular', completed: false },
  { id: 2, title: 'Build a Todo App', completed: true },
  { id: 3, title: 'Master TypeScript', completed: false }
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule ,TodoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  todos = todos;
  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required, 
        Validators.minLength(3)
      ],
    })
  })

  get title() {
    return this.todoForm.get('title') as FormControl;
  }

  get activeTodosCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  addTodo() {
    if(this.title.invalid) {
      return;
    }

    if(this.title.value.trim().length === 0) {
      return;
    }

    const newToodo: Todo = {
      id: this.todos.length + 1,
      title: this.title.value,
      completed: false
    }

    this.todos.push(newToodo);
    this.title.reset();
  }
}
