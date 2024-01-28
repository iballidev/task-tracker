import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskTrackerRoutingModule } from './task-tracker-routing.module';
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskTrackerComponent } from './task-tracker.component';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  declarations: [TaskTrackerComponent, TaskListComponent],
  imports: [
    CommonModule,
    TaskTrackerRoutingModule,
    ToolbarComponent,
    DragDropModule,
  ],
})
export class TaskTrackerModule {}
