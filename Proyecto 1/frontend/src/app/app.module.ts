import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './component/registro/registro.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { NotfoundComponent } from './component/notfound/notfound.component'
import { HttpClientModule }  from '@angular/common/http';
import { MenuAdminComponent } from './component/menu-admin/menu-admin.component';
import { AdministradorComponent } from './component/administrador/administrador.component';
import { AdminNoAprobadosComponent } from './component/admin-no-aprobados/admin-no-aprobados.component';
import { AdminListarUsuariosComponent } from './component/admin-listar-usuarios/admin-listar-usuarios.component';
import { CrearLibroComponent } from './component/crear-libro/crear-libro.component';
import { ModificarLibroComponent } from './component/modificar-libro/modificar-libro.component';
import { CatalogoLibroComponent } from './component/catalogo-libro/catalogo-libro.component';
import { CarritoCompraComponent } from './component/carrito-compra/carrito-compra.component';
import { MenuEditorialComponent } from './component/menu-editorial/menu-editorial.component';
import { MenuClienteComponent } from './component/menu-cliente/menu-cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CompraComponent } from './component/compra/compra.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    NotfoundComponent,
    MenuAdminComponent,
    AdministradorComponent,
    AdminNoAprobadosComponent,
    AdminListarUsuariosComponent,
    CrearLibroComponent,
    ModificarLibroComponent,
    CatalogoLibroComponent,
    CarritoCompraComponent,
    MenuEditorialComponent,
    MenuClienteComponent,
    CompraComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,   
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
