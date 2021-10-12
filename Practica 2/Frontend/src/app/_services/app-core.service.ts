import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import swal from 'sweetalert2'


@Injectable()
export class CoreService {
    constructor(private http: HttpClient) { }

    /**
     * Obtiene el listado del los productos
     */
    getProducts(user: string): Observable<any> {
        return this.http.get("https://login.universales.com/cotizador-gm/api/api_cotizador/gm/product/" + user)
            .pipe(
                catchError(this.handleError)
            )
    }

    /**
     * Obtiene la clase de vida y su codigo
     */
    getTypeLife(): Observable<any> {
        return this.http.get("https://login.universales.com/cotizador-gm/api/api_cotizador/gm/life")
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

