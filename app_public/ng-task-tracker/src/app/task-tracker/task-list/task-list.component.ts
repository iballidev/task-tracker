import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskService, UpdateTaskStage } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  searchTerm: string = "";


  columns: any = [
    // {
    //   id: 'open',
    //   name: 'Open',
    //   tasks: ['Task 1', 'Task 2', 'Task 3'],
    //   tag: 'openList',
    // },
    // {
    //   id: 'pending',
    //   name: 'Pending',
    //   tasks: ['Task 4', 'Task 5', 'Task 6'],
    //   tag: 'pendingList',
    // },
    // {
    //   id: 'inProgress',
    //   name: 'In Progress',
    //   tasks: ['Task 7', 'Task 8'],
    //   tag: 'inProgressList',
    // },
    // {
    //   id: 'completed',
    //   name: 'Completed',
    //   tasks: ['Task 9'],
    //   tag: 'completedList',
    // },
  ];

  constructor(private _authSvc: AuthService, private _taskSvc: TaskService) { }

  ngOnInit(): void {
    this.getTaskList();
  }

  onTaskDropped(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      let taskList = event.container.data;
      for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i];
        if (task.stage != event.container.id) {
          const data: UpdateTaskStage = {
            stage: parseInt(event.container.id)
          }
          this.updateTaskStage(data, task._id)
        }
      }
    }
  }

  getTaskList() {
    let userId = this._authSvc.currentUser.user_id;
    this._taskSvc.get_tasks_by_user_id(userId).subscribe((response: any) => {
      if (response) {
        this.columns = response?.tasks?.result;
      }
    });
  }

  updateTaskStage(data: UpdateTaskStage, taskId: string) {
    this._taskSvc.update_task_stage(data, taskId).subscribe((response: any) => {
    })
  }

}
