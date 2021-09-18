import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaAprobacion, RespuestaUsuarios } from '../modules/administrador/administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  
  url:string = "http://localhost:8091/api/"   
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXgiOiIxMjM0NTY3ODkwIiwibmFtZSI6InJhaW5tYW4iLCJpYXQiOjE1MTYyMzkwMjJ9.d2OvEtqoSwOGs5Q_dbZHKTzDRaOzNiJvT8coxm84wAg' })
  };

  constructor(private http:HttpClient) { }

  ListarNoAprobados():Observable<RespuestaUsuarios>{ 
  let direccion = this.url + 'noaprobado'
    return this.http.get<RespuestaUsuarios>(direccion,this.httpOptions)
  }  

  AprobarEditorial(id_editorial: string):Observable<RespuestaAprobacion>{
      let direccion = this.url + 'adminaprobar/'+id_editorial
      return this.http.get<RespuestaAprobacion>(direccion,this.httpOptions)
  }

  ListarUsuarios():Observable<RespuestaUsuarios>{ 
    let direccion = this.url + 'usuarios'
      return this.http.get<RespuestaUsuarios>(direccion,this.httpOptions)
  }

  EliminarUsuario(id_editorial: string):Observable<RespuestaAprobacion>{
    let direccion = this.url + 'adminborrar/'+id_editorial
    return this.http.delete<RespuestaAprobacion>(direccion,this.httpOptions)
  }


  

  



}


