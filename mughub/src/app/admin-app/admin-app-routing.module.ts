import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAppComponent } from './admin-app.component';

const routes: Routes = [
  { path: '', component: AdminAppComponent, children: [
    { path: 'roster', loadChildren: () => import('./roster/roster.module').then(m => m.RosterModule) }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAppRoutingModule { }
