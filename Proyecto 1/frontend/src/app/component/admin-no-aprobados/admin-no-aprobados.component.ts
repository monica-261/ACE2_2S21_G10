import { RespuestaUsuarios } from './../../modules/administrador/administrador';
import { AdministradorService } from './../../service/administrador.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-no-aprobados',
  templateUrl: './admin-no-aprobados.component.html',
  styleUrls: ['./admin-no-aprobados.component.css']
})
export class AdminNoAprobadosComponent implements OnInit {

  ListadoNoAprobados: any = []

  constructor(
    private _admin: AdministradorService
  ) { }

  ngOnInit(): void {
    this.ListarNoAprobados()
  }

  ListarNoAprobados() {
    this.ListadoNoAprobados=[]
    this._admin.ListarNoAprobados().subscribe(res => {

      let respuesta: RespuestaUsuarios = res
      //console.log()
      if (respuesta.msg == "Correcto"){
        let arr = Object.entries(respuesta.results);  
        for (let entry of arr){
          let arr4 = Object.entries(entry);
          this.ListadoNoAprobados.push(entry[1]) 
        }
      }
    })
  }

  AprobarEditorial(id_usuario:string){    
    this._admin.AprobarEditorial(id_usuario).subscribe(res=>{
      if (res['msg']=="Editorial aprobada con exito")  {      
        this.ListarNoAprobados()
      }    
    })
  }


  Aprobacion(id_usuario:string){
    Swal.fire({
      title: 'Book SA',
      text: "¿Aprobarlo?, No podrá reversar esta operación!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Aprobarla',
      cancelButtonText: "No, después"
    }).then((result) => {
      if (result.isConfirmed) {
        this.AprobarEditorial(id_usuario);
      }
    })  
  }

}
