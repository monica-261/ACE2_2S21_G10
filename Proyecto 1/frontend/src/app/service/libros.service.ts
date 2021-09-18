import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';  
import { catalogoLibros, registroLibro, respuestaLibro } from '../modules/libro/libros';

@Injectable({
  providedIn: 'root'
})
export class libroService {


  constructor( private http: HttpClient) { }

  getUrl() {
    return "http://34.68.18.16:";
  }

 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXgiOiIxMjM0NTY3ODkwIiwibmFtZSI6InJhaW5tYW4iLCJpYXQiOjE1MTYyMzkwMjJ9.d2OvEtqoSwOGs5Q_dbZHKTzDRaOzNiJvT8coxm84wAg' })
      };
 
 
      crearLibro(regis: registroLibro): Observable<respuestaLibro>{
        console.log(regis)
        const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXgiOiIxMjM0NTY3ODkwIiwibmFtZSI6InJhaW5tYW4iLCJpYXQiOjE1MTYyMzkwMjJ9.d2OvEtqoSwOGs5Q_dbZHKTzDRaOzNiJvT8coxm84wAg'
        
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXgiOiIxMjM0NTY3ODkwIiwibmFtZSI6InJhaW5tYW4iLCJpYXQiOjE1MTYyMzkwMjJ9.d2OvEtqoSwOGs5Q_dbZHKTzDRaOzNiJvT8coxm84wAg' })};
        console.log(regis)
        let sendData = JSON.stringify(regis)
        console.log(sendData)
        
        //return this.http.get(this.getUrl() + '/libros/getAllBooks')
        return this.http.post(this.getUrl() + '4000/libros/addBook',sendData,httpOptions)
      }

      obtenerLibros(){
        return this.http.get(this.getUrl() + '4000/libros/getAllBooks')
      }

      obtenerEditorial(){
        return this.http.get(this.getUrl() + '8091/api/usuarios',this.httpOptions)
      }

      obtenerLibroID(id : string){
        return this.http.get(this.getUrl() + '4000/libros/getBookByID/' + id)
      }

      modificarStock(id: string){
        return this.http.get(this.getUrl() + '4000/libros/updateBook/' + id)
      }

}
