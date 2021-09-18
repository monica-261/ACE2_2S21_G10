import { UsuarioService } from 'src/app/service/usuario.service';
import { Injectable } from '@angular/core';
import { loginUsuario, RegistroUsuario } from '../modules/usuario/usuario';
import * as EmailValidator from 'email-validator';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }

  validarEntradaRegistro(registro: RegistroUsuario): string {
    console.log(registro)
    if (registro.nombres =="" || registro.apellidos=="" || registro.usuario =="" || registro.correo=="" 
    || registro.celular =="" || registro.direccion == "" || registro.password2 =="" || registro.password ==""){
      return "Verifique que todos los datos hayan sea ingresados"
    }
    else {       
          if (!EmailValidator.validate(registro.correo)){
            return "Valide el formato del correo electronico ingresado"         
          }else{
            if (registro.password != registro.password2){
              return "Valide las contraseñas ingresadas"
            }   
          }   
        
      }   
      return "exito"
    }

    validarEntradaLogin(formL:loginUsuario): string {
      if (formL.usuario=="" || formL.password ==""){
        return "Verifique que todos los datos hayan sea ingresados"
      }
      return "exito"
    }


}
