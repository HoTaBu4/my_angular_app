import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

const todos = [
  { id: 1, title: 'Learn Angular', completed: false },
  { id: 2, title: 'Build a Todo App', completed: true },
  { id: 3, title: 'Master TypeScript', completed: false }
]

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  editing = false;
  todos = todos;
}
