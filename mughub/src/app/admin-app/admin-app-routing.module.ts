import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAppComponent } from './admin-app.component';
import { ResourcesComponent } from './resources/resources.component';


const routes: Routes = [
  { path: '', component: AdminAppComponent, children: [
    { path: '', redirectTo: 'roster', pathMatch: 'full'},
    { path: 'roster', loadChildren: () => import('./roster/roster.module').then(m => m.RosterModule) },
    { path: 'resources', component: ResourcesComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAppRoutingModule { }
