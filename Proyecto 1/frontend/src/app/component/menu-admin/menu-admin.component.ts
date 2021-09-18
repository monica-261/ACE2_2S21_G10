import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {
  usuarioAutenticado:any = ""
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    this.validarSesion() 
  }

  cerrarSesion(){
    sessionStorage.removeItem('usuario')
    sessionStorage.removeItem('tipo_usuario') 
  }

  validarSesion(){
   
  }

}
