import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  columns = [
    {
      id: 'open',
      name: 'Open',
      tasks: ['Task 1', 'Task 2', 'Task 3'],
      tag: 'openList',
    },
    {
      id: 'pending',
      name: 'Pending',
      tasks: ['Task 4', 'Task 5', 'Task 6'],
      tag: 'pendingList',
    },
    {
      id: 'inProgress',
      name: 'In Progress',
      tasks: ['Task 7', 'Task 8'],
      tag: 'inProgressList',
    },
    {
      id: 'completed',
      name: 'Completed',
      tasks: ['Task 9'],
      tag: 'completedList',
    },
  ];

  constructor(private _authSvc: AuthService, private _taskSvc: TaskService) {}

  ngOnInit(): void {
    this.getTaskList();
  }

  onTaskDropped(event: CdkDragDrop<string[]>): void {
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
    }
  }

  getTaskList() {
    let userId = this._authSvc.currentUser.user_id;
    this._taskSvc.get_tasks_by_user_id(userId).subscribe((response:any) => {
      if (response) {
        console.log('response: ', response);
        this.columns = response?.tasks?.result;
      } else {
      }
    });
  }
}
