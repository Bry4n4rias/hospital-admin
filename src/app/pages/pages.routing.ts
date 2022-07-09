import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DaashboardComponent } from './daashboard/daashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    // la data la podemos llamar desde los observables atraves del router
    // y ahi se econtrara lo q pusimos en data, esta en el breadcrumbs
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DaashboardComponent,
        data: { titulo: 'Dashboard' },
      }, //localhost:4200/dashboard
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'Progress' },
      }, //localhost:4200/dashboard/progress
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: { titulo: 'Grafica1' },
      }, //localhost:4200/dashboard/grafica1
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { titulo: 'Ajustes de cuenta' },
      }, //localhost:4200/dashboard/account-settings
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas' },
      }, //localhost:4200/dashboard/promesas
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } }, //localhost:4200/dashboard/promesas
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
