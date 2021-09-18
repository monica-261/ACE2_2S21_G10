import { NotfoundComponent } from './component/notfound/notfound.component';
import { RegistroComponent } from './component/registro/registro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNoAprobadosComponent} from './component/admin-no-aprobados/admin-no-aprobados.component';
import { AdministradorComponent} from './component/administrador/administrador.component';
import { AdminListarUsuariosComponent } from './component/admin-listar-usuarios/admin-listar-usuarios.component';

const routes: Routes = [
  {path: 'registro', component: RegistroComponent},
  {path: 'administrador', component: AdministradorComponent},
  {path: 'administrador/noaprobados', component: AdminNoAprobadosComponent},
  {path: 'administrador/listarusuarios', component: AdminListarUsuariosComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [RegistroComponent,LoginComponent,NotfoundComponent, AdministradorComponent, AdminNoAprobadosComponent, AdminListarUsuariosComponent]

