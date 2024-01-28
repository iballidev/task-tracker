import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'task-list',
    loadChildren: () => import('./task-tracker/task-tracker.module').then((m) => m.TaskTrackerModule),
  },
  {
    path: 'sandbox',
    loadChildren: () => import('./sandbox/sandbox.module').then((m) => m.SandboxModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
