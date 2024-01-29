import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskTrackerRoutingModule } from './task-tracker-routing.module';
import { TaskTrackerComponent } from './task-tracker.component';
import { TaskListComponent } from './task-list/task-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddTaskComponent } from './add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TaskTrackerComponent,
    TaskListComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    TaskTrackerRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TaskTrackerModule { }
