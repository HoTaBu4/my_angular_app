import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TodoComponent } from './components/todo/todo.component';
import { Todo } from './types/todo';
import { TodoFormComponent } from "./components/todo-form/todo-form.component";
import { todosService } from './services/todos.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TodoComponent, TodoFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {
  _todos: Todo[] = [];
  activeTodos: Todo[] = []
  private todosSub?: Subscription;

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

  constructor(
    private todosService: todosService
  ) {}

  ngOnInit(): void {
    this.todosSub = this.todosService.getTodos().subscribe((todos) => {
      console.log(todos)
      this.todos = todos;
    });
  }

  ngOnDestroy(): void {
    this.todosSub?.unsubscribe();
  }

  addTodo(newTitle: string) {
    this.todosService.createTodo(newTitle)
      .subscribe((newTodo) => {
        this._todos = [...this._todos, newTodo];
      });
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
