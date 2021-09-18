import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { loginUsuario, RegistroUsuario, RespuestaLogin, RespuestaRegistro } from '../modules/usuario/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url:string = "http://localhost:8090/api/"

  constructor(private http:HttpClient) { }

  Login(form: loginUsuario) :Observable<RespuestaLogin> {
    let direccion = this.url + 'login'
    return this.http.post<RespuestaLogin>(direccion, form)
  }


  registro(form: RegistroUsuario):Observable<RespuestaRegistro> {
    let direccion = this.url + 'registro'
    return this.http.post<RespuestaRegistro>(direccion, form)
  }

}
