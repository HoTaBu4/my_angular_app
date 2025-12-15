import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, output, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../types/todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {
  @Output()delete = new EventEmitter<void>();
  @Output()rename = new EventEmitter<string>();
  @Output()toggle = new EventEmitter<void>();
  @Input()
  todo!: Todo;

  @ViewChild('titleField') set titleField(value: ElementRef) {
    if (value) {
      value.nativeElement.focus()
    }
  };
  title = '';
  editing = false;

  edit () {
    this.editing = true;
    this.title = this.todo.title;
  }

  save () {
    if(!this.editing) {
      return
    } 

    const newTitle = this.title.trim();
    if(!newTitle) {
      this.delete.emit();
    }

    this.editing = false;
    this.rename.emit(newTitle);
  }
}
