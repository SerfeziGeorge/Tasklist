import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { of, tap, map, catchError, throwError, retry, retryWhen } from 'rxjs';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  constructor(private http: HttpClient) {}

  read() {
    if (this.tasks.length) {
      return of(this.tasks);
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    headers = headers.append('Api-Token', '1234abcd');
    const headerObject = {
      headers: headers,
    };

    // returns a observable
    // here the get req is passing the date the pipe, then functions in the pipe get executed in the order they are declared.
    return this.http.get<Task[]>(`/api/tasks`, headerObject).pipe(
      // provide the data int the Task[] array
      tap((tasks) => {
        this.tasks = tasks;
      }),
      catchError(this.handleError)
    );
  }

  readOne(id: string | null) {
    // return the existing date or return an emty form

    return this.read().pipe(
      map((tasks) => {
        const task = tasks.find((task: Task) => task.id === id);

        if (task) {
          return task;
        }

        return { title: '' };
      })
    );
  }

  // if you have an error where the subscribe has an error then move the catchError inside the pipe function. catchError is a rxjs operator. operators need to wrap around pipe functions in order to use it.
  //https://stackoverflow.com/questions/51727334/angular-6-property-subscribe-does-not-exist-on-type-operator-function
  create(payload: Task) {
    return this.http.post<Task>(`/api/tasks`, payload).pipe(
      tap((task) => {
        this.tasks = [...this.tasks, task];
      }),
      catchError(this.handleError)
    );
  }

  update(payload: Task) {
    return this.http.put<Task>(`/api/tasks/${payload.id}`, payload).pipe(
      tap((task) => {
        this.tasks = this.tasks.map((item: Task) => {
          if (item.id === task.id) {
            return task;
          }

          return item;
        });
      }),
      catchError(this.handleError)
    );
  }
  delete(payload: Task) {
    return this.http.delete<Task>(`/api/tasks/${payload.id}`).pipe(
      tap(() => {
        this.tasks = this.tasks.filter((task: Task) => task.id !== payload.id);
      }),

      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    //console.log(err);
    if (err.error instanceof ErrorEvent) {
      //client-side
      console.warn('Client', err.message);
    } else {
      //server-side
      console.warn('Server', err.status);
    }

    return throwError(() => new Error(err.message));
  }
}
