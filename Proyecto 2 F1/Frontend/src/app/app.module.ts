
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AppInterceptor } from './_util/app-interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { AppTemplateComponent } from './app-template/app-template.component';
import { AppNotfoundComponent } from './app-notfound/app-notfound.component';
import { HeaderComponent } from './app-template/header/header.component';
import { AppRoutingModule } from './_util/app-routing.module';

import {DropdownModule} from 'primeng/dropdown';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { DatePickerService } from './_services/datepicker.serevice';
import { InicioComponent } from './inicio/inicio.component';
import { ActividadComponent } from './actividad/actividad.component';
import { PesoComponent } from './peso/peso.component';
import { DistanciaComponent } from './distancia/distancia.component';
import { PosturasComponent } from './posturas/posturas.component';
import {FileUploadModule} from 'primeng/fileupload';
import { CotizadorService } from './_services/plan.service';
import {TableModule} from 'primeng/table';
import {RadioButtonModule} from 'primeng/radiobutton';
import { CoreService } from './_services/app-core.service';

@NgModule({
  declarations: [
    AppComponent,
    AppTemplateComponent,
    AppNotfoundComponent,
    HeaderComponent,
    InicioComponent, 
    ActividadComponent, 
    PesoComponent,
    DistanciaComponent, 
    PosturasComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    FileUploadModule,
    ScrollPanelModule,
    TableModule,
    RadioButtonModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot()    
  ],
  providers: [MDBSpinningPreloader,
    CookieService,
    DatePickerService,
    CotizadorService,
    CoreService,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
        