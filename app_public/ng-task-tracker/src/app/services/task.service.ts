import { Injectable, Injector } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends DataService {

  constructor(http: HttpClient, injector: Injector) {
    super("", http, injector);
  }

  create_task(payload: Task) {
    console.log("payload: ", payload)
    this.create(payload, "/tasks/add").subscribe((response) => {
      console.log("response: ", response)
    })
  }
}


export interface Task {
  title: String;
  description: String;
  dueDate: String,
  userId: String,
}