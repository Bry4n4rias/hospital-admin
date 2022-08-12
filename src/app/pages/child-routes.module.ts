import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DaashboardComponent } from './daashboard/daashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
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
  {
    path: 'perfil',
    component: PerfilComponent,
    data: { titulo: 'Perfil de usuario' },
  },
  {
    path: 'buscar/:termino',
    component: BusquedaComponent,
    data: { titulo: 'Busqueda global' },
  },

  // Mantenimientos
  {
    path: 'usuarios',
    canActivate: [AdminGuard],
    component: UsuariosComponent,
    data: { titulo: 'Mantenimientos de usuarios' },
  },
  {
    path: 'hospitales',
    component: HospitalesComponent,
    data: { titulo: 'Mantenimientos de hospitales' },
  },
  {
    path: 'medicos',
    component: MedicosComponent,
    data: { titulo: 'Mantenimientos de medicos' },
  },
  {
    path: 'medico/:id',
    component: MedicoComponent,
    data: { titulo: 'Mantenimientos de medicos' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes), CommonModule],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
