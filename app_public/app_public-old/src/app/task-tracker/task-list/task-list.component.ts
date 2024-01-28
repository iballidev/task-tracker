import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
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
}
