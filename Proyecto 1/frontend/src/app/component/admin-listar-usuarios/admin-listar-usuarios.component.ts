import { Component, OnInit } from '@angular/core';
import { RespuestaUsuarios } from 'src/app/modules/administrador/administrador';
import { AdministradorService } from 'src/app/service/administrador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-listar-usuarios',
  templateUrl: './admin-listar-usuarios.component.html',
  styleUrls: ['./admin-listar-usuarios.component.css']
})
export class AdminListarUsuariosComponent implements OnInit {

  ListadoUsuarios: any = []
  constructor(
    private _admin: AdministradorService
  ) { }

  ngOnInit(): void {    
    this.ListarUsuarios()    
  }

  ListarUsuarios() {
    this.ListadoUsuarios=[]    
    this._admin.ListarUsuarios().subscribe(res => {      
      console.log(res)
      let respuesta: RespuestaUsuarios = res
      
      if (respuesta.msg == "Correcto"){
        let arr = Object.entries(respuesta.results);  
        for (let entry of arr){
          let arr4 = Object.entries(entry);
          this.ListadoUsuarios.push(entry[1]) 
        }
      }
    })
  }

  EliminarUsuario(id_usuario:string) {
    console.log("here")
    this._admin.EliminarUsuario(id_usuario).subscribe(res=>{
      console.log(res)
      if (res['msg']=="Usuario eliminado con exito")  {      
        this.ListarUsuarios()
      }    
    })
  }


  EliminarUser(id_usuario:string){
    Swal.fire({
      title: 'Book SA',
      text: "¿Eliminarlo?, No podrá reversar esta operación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.EliminarUsuario(id_usuario);
      }
    })  
  }

}
