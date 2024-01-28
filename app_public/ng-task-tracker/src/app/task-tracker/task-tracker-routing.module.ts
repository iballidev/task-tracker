import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskTrackerComponent } from './task-tracker.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  {
    path: '',
    component: TaskTrackerComponent,
    children: [
      { path: '', component: TaskListComponent },
      { path: 'tasks', component: TaskListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskTrackerRoutingModule { }
