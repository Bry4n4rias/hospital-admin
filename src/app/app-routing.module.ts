import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DaashboardComponent } from './pages/daashboard/daashboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NotfoundpageComponent } from './pages/notfoundpage/notfoundpage.component';
import { PagesComponent } from './pages/pages.component';
import { ProgressComponent } from './pages/progress/progress.component';

const routes: Routes = [
  {
    // dentro del app component va a ver un router outlet q es el q coje la del login, registro y las hijas
    // dentro de PagesComponent va a ver otro router outlet q es el q maneja esta rutas hijas ya con el estilo en pages html

    // rutas hijas del pages component q son los q se muestran desps de hacer login
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DaashboardComponent }, //localhost:4200/dashboard
      { path: 'progress', component: ProgressComponent }, //localhost:4200/progress
      { path: 'grafica1', component: Grafica1Component }, //localhost:4200/grafica1
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // localhost:4200 se muestra el dashboard
    ],
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', component: NotfoundpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
