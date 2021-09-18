
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { Router} from '@angular/router'
import { RegistroUsuario } from 'src/app/modules/usuario/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ValidacionesService } from 'src/app/service/validaciones.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-registo',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  ValidacionRegistro:string="";
  esEditorial:boolean=false;
  registroForm = new  FormGroup({
    usuario: new FormControl('', Validators.required),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),    
    password: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),    
    rol: new FormControl('', Validators.required), 
    aprobado: new FormControl('', Validators.required)    
    
  })  
  

  constructor(
    private _usuario: UsuarioService,
    private router:Router,
    private _validador:ValidacionesService
  ){}
  

  ngOnInit(): void {
    
  }

  Registro(formRegistro: RegistroUsuario){  
     
    if (this.esEditorial){
      formRegistro.aprobado = "0"
      formRegistro.rol = "Editorial"
    }else{
      formRegistro.aprobado = "1"
      formRegistro.rol = "cliente"
    }
    
    
    this.ValidacionRegistro = this._validador.validarEntradaRegistro(formRegistro)
    if (this.ValidacionRegistro== 'exito'){ 
      this._usuario.registro(formRegistro).subscribe(data =>{        
        console.log(data)        
          if (data['msg'] == "Usuario registrado con exito"){            
            if (this.esEditorial){
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Editorial creado correctamente, espere confirmación',
                showConfirmButton: false,
                timer: 1500
              })   
            }else{
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cliente creado correctamente',
                showConfirmButton: false,
                timer: 1500
              })   
            }
            this.router.navigate(['/login'])        
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Existió inconveniente en registrar usuario',
            showConfirmButton: false,
            timer: 1500
          })   
        }

      }) 

    }else{    
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: this.ValidacionRegistro,
        showConfirmButton: false,
        timer: 1500
      })    
    }   
  }
}

  


