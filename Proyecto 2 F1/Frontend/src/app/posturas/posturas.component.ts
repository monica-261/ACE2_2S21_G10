import { OnInit, Component, EventEmitter, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';

import { DatePickerService } from '../_services/datepicker.serevice';
import { Form } from '@angular/forms';
import swal from 'sweetalert2';
import { CotizadorService } from '../_services/plan.service';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { AppServiceService } from '../_services/app-service.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartsModule } from 'ng2-charts';
import * as Chart from 'chart.js';
import { VelocidadViento } from '../_models/VelocidadViento';
import { Humedad } from '../_models/Humedad';
import { Temperatura } from '../_models/Temperatura';
import { Luz } from '../_models/Luz';
import { DireccionViento } from '../_models/DireccionViento';
import { EstadoGeneral } from '../_models/EstadoGeneral';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-posturas',
  templateUrl: './posturas.component.html',
  styleUrls: ['./posturas.component.css']
})
export class PosturasComponent implements AfterViewInit  {
  @ViewChild('minutoCanvas', {static: false}) minutoCanvas: ElementRef;
  minutoChart: any;
  @ViewChild('horaCanvas', {static: false}) horaCanvas: ElementRef;
  horaChart: any;
  @ViewChild('diaCanvas', {static: false}) diaCanvas: ElementRef;
  diaChart: any;
  
  constructor( private cotizadorService: CotizadorService, private appService: AppServiceService) {

  }

  ngAfterViewInit() {
    (async () => { 
      while(true){
        this.cotizadorService.cantidadPosturasIncorrectasPorMinuto().subscribe(data => {
          let datos = data.data;
  
          let dataParam : number[] = [];
          let labelParam : string[] = [];
          let i = 0;
          if(datos.length > 15){
            i = datos.length - 15;
          }
          for(i = i; i < datos.length; i++){
            dataParam.push(parseFloat(datos[i].malas_posturas));
            labelParam.push(datos[i].fecha_mininuto);
          }
  
          this.minutoChartMethod(dataParam, labelParam);
        });

        this.cotizadorService.cantidadPosturasIncorrectasPorHora().subscribe(data => {
          let datos = data.data;
  
          let dataParam : number[] = [];
          let labelParam : string[] = [];
          let i = 0;
          if(datos.length > 15){
            i = datos.length - 15;
          }
          for(i = i; i < datos.length; i++){
            dataParam.push(parseFloat(datos[i].malas_posturas));
            labelParam.push(datos[i].fecha_hora);
          }
  
          this.horaChartMethod(dataParam, labelParam);
        });

        this.cotizadorService.cantidadPosturasIncorrectasPorDia().subscribe(data => {
          let datos = data.data;
  
          let dataParam : number[] = [];
          let labelParam : string[] = [];
          let i = 0;
          if(datos.length > 15){
            i = datos.length - 15;
          }
          for(i = i; i < datos.length; i++){
            dataParam.push(parseFloat(datos[i].malas_posturas));
            labelParam.push(datos[i].dia);
          }
  
          this.diaChartMethod(dataParam, labelParam);
        });
     
      await this.delay(3000);
      }
    })();
  }

  minutoChartMethod(dataParam : number[], labelParam : string[]) {
    this.minutoChart = new Chart(this.minutoCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labelParam,
        datasets: [
          {
            label: 'Peso historico',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: dataParam,
            spanGaps: false,
          }
        ]
      }
    });
  }

  horaChartMethod(dataParam : number[], labelParam : string[]) {
    this.horaChart = new Chart(this.horaCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labelParam,
        datasets: [
          {
            label: 'Peso historico',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: dataParam,
            spanGaps: false,
          }
        ]
      }
    });
  }

  diaChartMethod(dataParam : number[], labelParam : string[]) {
    this.diaChart = new Chart(this.diaCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labelParam,
        datasets: [
          {
            label: 'Peso historico',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: dataParam,
            spanGaps: false,
          }
        ]
      }
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}