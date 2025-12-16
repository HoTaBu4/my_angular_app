import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../types/todo';

@Injectable({
  providedIn: 'root',
})
export class todosService {

  constructor (
    private http: HttpClient
  ) {

  }
  getTodos () {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=10')
  }
}
