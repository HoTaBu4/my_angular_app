import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../types/todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  @Output()
  delete = new EventEmitter();

  @Input()
  todo!: Todo;

  @ViewChild('titleField') set titleField(value: ElementRef) {
    if (value) {
      value.nativeElement.focus()
    }
  };

  editing = false;
}
