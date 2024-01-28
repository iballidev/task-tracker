import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SandboxComponent } from './sandbox.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';

const routes: Routes = [
  {
    path: '',
    component: SandboxComponent,
    children: [
      { path: '', component: DragAndDropComponent },
      { path: 'drag-and-drop', component: DragAndDropComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandboxRoutingModule {}
