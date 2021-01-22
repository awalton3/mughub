import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'admin', loadChildren: () => import('./admin-app/admin-app.module').then(m => m.AdminAppModule) },
  { path: 'student', loadChildren: () => import('./student-app/student-app.module').then(m => m.StudentAppModule) },
  { path: 'tutor', loadChildren: () => import('./tutor-app/tutor-app.module').then(m => m.TutorAppModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
