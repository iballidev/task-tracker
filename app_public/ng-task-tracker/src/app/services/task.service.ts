import { Injectable, Injector } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends DataService {
  constructor(http: HttpClient, injector: Injector) {
    super('', http, injector);
  }

  create_task(payload: Task) {
    return this.create(payload, '/tasks/add').pipe(
      map((response) => {
        if (response) {
          return true;
        }
        return null;
      })
    );
  }

  get_tasks_by_user_id(userId: string) {
    console.log('userId: ', userId);
    return this.get_data(`tasks/user/${userId}`).pipe(
      map((response) => {
        console.log('response: ', response);
        if (response) {
          return response;
        }
        return [];
      })
    );
  }

  get_task_details(taskId: string) {
    console.log('userId: ', taskId);
    return this.get_data(`tasks/${taskId}`).pipe(
      map((response) => {
        console.log('response: ', response);
        if (response) {
          return response;
        }
        return [];
      })
    );
  }

  update_task_stage(payload: UpdateTaskStage, taskId: string) {
    return this.update_patch_data(payload, `tasks/${taskId}`).pipe(
      map((response:any) => {
        console.log('response: ', response);
        if (response) {
          return response;
        }
        return [];
      })
    );
  }
}

export interface Task {
  title: String;
  description: String;
  dueDate: String;
  userId: String;
}

export interface UpdateTaskStage {
  stage: Number
}
