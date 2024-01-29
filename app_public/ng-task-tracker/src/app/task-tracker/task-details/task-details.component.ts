import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { TaskTag } from '../../models/enums/task-tag';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit {
  task: any;
  taskTag: any = TaskTag
  stages = {
    Open: "Open",
    Pending: "Pending",
    InProgress: "In Progress",
    Completed: "Completed",
  }

  constructor(private _authSvc: AuthService, private _taskSvc: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTaskId()

  }

  getTaskId() {
    let taskId;
    this.route.params.subscribe((param: any) => {
      console.log("param.taskId: ", param.taskId)
      taskId = param.taskId
      this.getTaskDetails(taskId);
    })
    return taskId
  }

  getTaskDetails(taskId: string) {
    this._taskSvc.get_task_details(taskId).subscribe((result: any) => {
      if (result) {
        console.log('result: ', result);
        this.task = result.response
      }
    });
  }
}
