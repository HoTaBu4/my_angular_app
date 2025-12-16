import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../types/todo';


const USER_ID = 100
@Injectable({
  providedIn: 'root',
})
export class todosService {

  constructor (
    private http: HttpClient
  ) {

  }
  getTodos () {
    return this.http.get<Todo[]>(`https://mate.academy/students-api/todos?userId=${USER_ID}`)
  }
}
