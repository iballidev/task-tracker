import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskTrackerRoutingModule } from './task-tracker-routing.module';
import { TaskTrackerComponent } from './task-tracker.component';
import { TaskListComponent } from './task-list/task-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddTaskComponent } from './add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { FilterNestedArrayPipe } from '../helpers/filter-nested-array.pipe';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { CustomDatePipe } from '../helpers/custom-date.pipe';


@NgModule({
  declarations: [
    TaskTrackerComponent,
    TaskListComponent,
    AddTaskComponent,
    TaskDetailsComponent,
    FilterNestedArrayPipe,
    UpdateTaskComponent,
    CustomDatePipe
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
