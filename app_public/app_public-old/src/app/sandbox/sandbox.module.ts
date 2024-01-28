import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SandboxRoutingModule } from './sandbox-routing.module';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { SandboxComponent } from './sandbox.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [SandboxComponent, DragAndDropComponent],
  imports: [CommonModule, SandboxRoutingModule, DragDropModule],
})
export class SandboxModule {}
