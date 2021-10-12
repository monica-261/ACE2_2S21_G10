import { UtilServiceService } from './util-service.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private urlSegurity: string[] = [];

  constructor(
    private http: HttpClient,
    private util: UtilServiceService
  ) { }



  pushUrlSecurity(urlroute: string) {
    this.urlSegurity.push(urlroute);
  }

  getUrlSecurity() {
    return this.urlSegurity;
  }

}
