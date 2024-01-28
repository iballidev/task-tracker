import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-and-drop',
  standalone: false,
  templateUrl: './drag-and-drop.component.html',
  styleUrl: './drag-and-drop.component.scss',
})
export class DragAndDropComponent implements OnInit {
  connectedLists: any;
  columns = [
    {
      id: 'todo',
      name: 'To Do',
      tasks: ['Task 1', 'Task 2', 'Task 3'],
      tag: 'todoList',
    },
    {
      id: 'inProgress',
      name: 'In Progress',
      tasks: ['Task 4', 'Task 5'],
      tag: 'inProgressList',
    },
    { id: 'done', name: 'Done', tasks: ['Task 6'], tag: 'doneList' },
  ];

  ngOnInit(): void {
    this.connectedLists = this.columns.map((column) => column.tag);
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

  //
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
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
