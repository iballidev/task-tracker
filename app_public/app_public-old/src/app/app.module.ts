import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppErrorHandler } from './common/app-error-handler';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModule,
    // ToastrModule.forRoot()
  ],
  providers:[
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },]
})
export class AppModule {}
