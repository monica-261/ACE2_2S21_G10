import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable()
export class CotizadorService {

    constructor(private http: HttpClient) { }

    tiempoSentadoTotal() : Observable<any>{
        return this.http.get("http://localhost:4444/api/tiempoSentadoTotal")
        .pipe(
            catchError(this.handleError)
        )
    }

    tiempoSentadoActual() : Observable<any>{
        return this.http.get("http://localhost:4444/api/tiempoSentadoActual")
        .pipe(
            catchError(this.handleError)
        )
    }

    cantidadLevantadoPorDia() : Observable<any>{
        return this.http.get("http://localhost:4444/api/cantidadLevantadoPorDia")
        .pipe(
            catchError(this.handleError)
        )
    }

    pesoHistorico() : Observable<any>{
        return this.http.get("http://localhost:4444/api/pesoHistorico")
        .pipe(
            catchError(this.handleError)
        )
    }

    pesoActualPromedio() : Observable<any>{
        return this.http.get("http://localhost:4444/api/pesoActualPromedio")
        .pipe(
            catchError(this.handleError)
        )
    }

    horariosDeUso() : Observable<any>{
        return this.http.get("http://localhost:4444/api/horariosDeUso")
        .pipe(
            catchError(this.handleError)
        )
    }

    distanciaDelRespaldoPromedioActual() : Observable<any>{
        return this.http.get("http://localhost:4444/api/distanciaDelRespaldoPromedioActual")
        .pipe(
            catchError(this.handleError)
        )
    }

    distanciaDelRespaldoActual() : Observable<any>{
        return this.http.get("http://localhost:4444/api/distanciaDelRespaldoActual")
        .pipe(
            catchError(this.handleError)
        )
    }

    distanciaDelRespaldoPromedioHistorico() : Observable<any>{
        return this.http.get("http://localhost:4444/api/distanciaDelRespaldoPromedioHistorico")
        .pipe(
            catchError(this.handleError)
        )
    }

    distanciaDelRespaldoHistorico() : Observable<any>{
        return this.http.get("http://localhost:4444/api/distanciaDelRespaldoHistorico")
        .pipe(
            catchError(this.handleError)
        )
    }

    cantidadPosturasIncorrectasPorMinuto() : Observable<any>{
        return this.http.get("http://localhost:4444/api/cantidadPosturasIncorrectasPorMinuto")
        .pipe(
            catchError(this.handleError)
        )
    }

    cantidadPosturasIncorrectasPorHora() : Observable<any>{
        return this.http.get("http://localhost:4444/api/cantidadPosturasIncorrectasPorHora")
        .pipe(
            catchError(this.handleError)
        )
    }

    cantidadPosturasIncorrectasPorDia() : Observable<any>{
        return this.http.get("http://localhost:4444/api/cantidadPosturasIncorrectasPorDia")
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