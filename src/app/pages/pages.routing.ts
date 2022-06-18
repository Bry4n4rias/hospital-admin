import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaashboardComponent } from './daashboard/daashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: DaashboardComponent }, //localhost:4200/dashboard
      { path: 'progress', component: ProgressComponent }, //localhost:4200/dashboard/progress
      { path: 'grafica1', component: Grafica1Component }, //localhost:4200/dashboard/grafica1
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
