import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskTrackerComponent } from './task-tracker.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { UpdateTaskComponent } from './update-task/update-task.component';

const routes: Routes = [
  {
    path: '',
    component: TaskTrackerComponent,
    children: [
      { path: '', component: TaskListComponent },
      { path: 'board', component: TaskListComponent },
      { path: 'add', component: AddTaskComponent },
      { path: 'details/:taskId', component: TaskDetailsComponent },
      { path: 'update/:taskId', component: UpdateTaskComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskTrackerRoutingModule { }
