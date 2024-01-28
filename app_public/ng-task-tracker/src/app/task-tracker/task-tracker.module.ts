import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskTrackerRoutingModule } from './task-tracker-routing.module';
import { TaskTrackerComponent } from './task-tracker.component';
import { TaskListComponent } from './task-list/task-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    TaskTrackerComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    TaskTrackerRoutingModule,
    DragDropModule
  ]
})
export class TaskTrackerModule { }
