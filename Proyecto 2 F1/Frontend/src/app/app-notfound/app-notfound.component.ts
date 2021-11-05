import { Component, OnInit } from '@angular/core';
import { UtilServiceService } from '../_services/util-service.service';

import { environment } from '../../environments/environment';

declare var swal: any;
@Component({
  selector: 'app-app-notfound',
  templateUrl: './app-notfound.component.html',
  styleUrls: ['./app-notfound.component.css']
})
export class AppNotfoundComponent implements OnInit {

  titulo = '404';
  descripcion = 'Recurso no encontrado.';

  constructor(
    private util: UtilServiceService
  ) { }

  ngOnInit() {
    const error = this.util.getStatusError();
    if (error === 401) {
      window.location.href = environment.urlLogin;
    } else if (error === 403) {
      this.titulo = '403';
      this.descripcion = 'Privilegios insuficientes para consultar este recurso.';
      swal.fire({
        title: '<strong>403</strong>',
        type: 'error',
        html:
          'Privilegios insuficientes para consultar este recurso.',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Aceptar!',
        confirmButtonAriaLabel: 'Aceptar!',
      }).then((result) => {
        if (result.value) {

        }
      });
    } else if (error === 404) {
      this.titulo = '404.';
      this.descripcion = 'Recurso no encontrado.';
      swal.fire({
        title: '<strong>404</strong>',
        type: 'error',
        html:
          'Recurso no encontrado.',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Aceptar!',
        confirmButtonAriaLabel: 'Aceptar!',
      }).then((result) => {
        if (result.value) {

        }
      });
    } else if (error > -1) {
      this.titulo = '' + error;
      this.descripcion = 'Error interno, consulte con IT.';
      swal.fire({
        title: '<strong>' + error + '</strong>',
        type: 'error',
        html:
          'Error interno, consulte con IT.',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Aceptar!',
        confirmButtonAriaLabel: 'Aceptar!',
      }).then((result) => {
        if (result.value) {

        }
      });
    }
  }
}
