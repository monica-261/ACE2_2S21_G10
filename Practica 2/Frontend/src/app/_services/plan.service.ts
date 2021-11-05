import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable()
export class CotizadorService {

    constructor(private http: HttpClient) { }

    obtieneVelocidadViento() : Observable<any>{
        return this.http.get("http://34.125.220.159:3000/api/obtenerVelocidadViento")
        .pipe(
            catchError(this.handleError)
        )
    }

    obtieneHumedad() : Observable<any>{
        return this.http.get("http://34.125.220.159:3000/api/obtenerHumedad")
        .pipe(
            catchError(this.handleError)
        )
    }

    obtieneTemperatura() : Observable<any>{
        return this.http.get("http://34.125.220.159:3000/api/obtenerTemperatura")
        .pipe(
            catchError(this.handleError)
        )
    }

    obtieneLuz() : Observable<any>{
        return this.http.get("http://34.125.220.159:3000/api/obtenerLuz")
        .pipe(
            catchError(this.handleError)
        )
    }

    obtieneDireccionViento() : Observable<any>{
        return this.http.get("http://34.125.220.159:3000/api/obtenerDireccionViento")
        .pipe(
            catchError(this.handleError)
        )
    }

    obtieneEstado() : Observable<any>{
        return this.http.get("http://34.125.220.159:3000/api/obtenerEstadoGeneral")
        .pipe(
            catchError(this.handleError)
        )
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            swal.fire('Error', 'Ha ocurrido un error en la petición', 'error');

        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            swal.fire('Error', 'Ha ocurrido un error en la petición.');

        }
        // return an observable with a user-facing error message
        return throwError('Ha ocurrido un error en la petición.');
    }
}