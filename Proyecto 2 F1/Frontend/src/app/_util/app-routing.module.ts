import { AppNotfoundComponent } from '../app-notfound/app-notfound.component';
import { AppGuardGuard } from './app-guard.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../inicio/inicio.component';
import { ActividadComponent } from '../actividad/actividad.component';
import { PesoComponent } from '../peso/peso.component';
import { DistanciaComponent } from '../distancia/distancia.component';
import { PosturasComponent } from '../posturas/posturas.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '', component: AppNotfoundComponent, canActivate: [AppGuardGuard] },
  { path: 'inicio', component: InicioComponent },
  { path: 'actividad', component: ActividadComponent },
  { path: 'peso', component: PesoComponent },
  { path: 'distancia', component: DistanciaComponent }, 
  { path: 'posturas', component: PosturasComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
