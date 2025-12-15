import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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

export class AppComponent {
  todos = todos;

  get activeTodosCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  addTodo(newTitle: string) {
     const newTodo: Todo = {
      id: this.todos.length + 1,
      title: newTitle,
      completed: false
    }

    this.todos = [...this.todos, newTodo];
  }

  renameTodo(id: number, title: string) {
    this.todos = this.todos.map(todo => 
      todo.id === id ? { ...todo, title } : todo
    );
  }

  toggleTodo(id: number) {
    this.todos = this.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  deleteTodo(id: number) { 
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
