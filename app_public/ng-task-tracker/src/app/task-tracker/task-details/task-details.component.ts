import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskTag } from '../../models/enums/task-tag';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent implements OnInit {
  task: any;
  taskTag: any = TaskTag;
  stages = {
    Open: 'Open',
    Pending: 'Pending',
    InProgress: 'In Progress',
    Completed: 'Completed',
  };
  subscriptions: Subscription[] = [];

  constructor(
    private _authSvc: AuthService,
    private _taskSvc: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTaskId();
  }

  async getTaskId() {
    let taskId;
    let subscription = await this.route.params.subscribe((param: any) => {
      console.log('param.taskId: ', param.taskId);
      taskId = param.taskId;
      this.getTaskDetails(taskId);
    });
    this.subscriptions.push(subscription)
    return taskId;
  }


  getTaskDetails(taskId: string) {
    let subscription = this._taskSvc
      .get_task_details(taskId)
      .subscribe((result: any) => {
        if (result) {
          this.task = result.task;
        }
      });
    this.subscriptions.push(subscription)
  }

  deleteTask(taskId: string) {
    let subscription = this._taskSvc.delete_task(taskId).subscribe((result: any) => {
      console.log("delete result: ", result)
      if (result) {
        this.router.navigate(['/tasks'])
      }
    });
    this.subscriptions.push(subscription)
  }

  onEdit(taskId: string) {
    this.router.navigate(['/tasks/update', taskId])
  }



  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
