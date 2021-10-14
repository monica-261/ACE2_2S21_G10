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
  selector: 'app-crece',
  templateUrl: './crece.component.html',
  styleUrls: ['./crece.component.css']
})
export class CreceComponent implements AfterViewInit  {
  @ViewChild('vientoCanvas', {static: false}) vientoCanvas: ElementRef;
  vientoChart: any;

  @ViewChild('humedadCanvas', {static: false}) humedadCanvas: ElementRef;
  humedadChart: any;
  
  @ViewChild('direcCanvas', {static: false}) direcCanvas: ElementRef;
  direcChart: any;

  @ViewChild('luzCanvas', {static: false}) luzCanvas: ElementRef;
  luzChart: any;

  viento : VelocidadViento;
  humedad : Humedad;
  temperatura : Temperatura;
  luz : Luz;
  direccion : DireccionViento;
  grados : number = 35;
  velViento : string;
  dateViento : string;
  cantHumedad : string;
  dateHumedad : string;
  cantTemperatura : string;
  dateTemperatura : string;
  cantLuz : string;
  dateLuz : string;
  cantDireccion : string;
  dateDireccion : string;
  estado : string;
  estadoGeneral : EstadoGeneral;
  estado_viento : string;
  estado_visibilidad : string;
  estado_lluvia : string;
  estado_calor : string;

  vientoB:boolean = true;
  solB:boolean = true;
  lluviaB:boolean = true;
  calorB:boolean = true;
  
  constructor( private cotizadorService: CotizadorService, private appService: AppServiceService) {

  }

  ngAfterViewInit() {
    (async () => { 
      while(true){
      this.cotizadorService.obtieneEstado().subscribe(data => {
        this.estadoGeneral = data;
        this.estado = this.estadoGeneral.estado;
        this.estado_calor = this.estadoGeneral.estado_calor;
        this.estado_lluvia = this.estadoGeneral.estado_lluvia;
        this.estado_viento = this.estadoGeneral.estado_viento;
        this.estado_visibilidad = this.estadoGeneral.estado_visibilidad;
        this.vientoB = !(this.estado_viento == 'normal');
        this.solB = !(this.estado_visibilidad == 'nublado');
        this.lluviaB = (this.estado_lluvia == 'con lluvia');
        this.calorB = (this.estado_calor == 'con calor');
      });

      this.cotizadorService.obtieneVelocidadViento().subscribe(data => {
        this.viento = data;
        this.velViento = this.viento.registros[this.viento.registros.length - 1].velocidad_viento;
        this.dateViento = this.viento.registros[this.viento.registros.length - 1].fecha_hora;

        let dataParam : number[] = [];
        let labelParam : string[] = [];
        let i = 0;
        if(this.viento.registros.length > 15){
          i = this.viento.registros.length - 15;
        }
        for(i = i; i < this.viento.registros.length; i++){
          dataParam.push(parseFloat(this.viento.registros[i].velocidad_viento));
          labelParam.push(this.viento.registros[i].fecha_hora);
        }

        this.vientoChartMethod(dataParam, labelParam);
      });

      this.cotizadorService.obtieneHumedad().subscribe(data => {
        this.humedad = data;
        this.cantHumedad = this.humedad.registros[this.humedad.registros.length - 1].humedad;
        this.dateHumedad = this.humedad.registros[this.humedad.registros.length - 1].fecha_hora;

        let dataParam : number[] = [];
        let labelParam : string[] = [];
        let i = 0;
        if(this.humedad.registros.length > 15){
          i = this.humedad.registros.length - 15;
        }
        for(i = i; i < this.humedad.registros.length; i++){
          dataParam.push(parseFloat(this.humedad.registros[i].humedad));
          labelParam.push(this.humedad.registros[i].fecha_hora);
        }

        this.humedadChartMethod(dataParam, labelParam);
      });

      this.cotizadorService.obtieneTemperatura().subscribe(data => {
        this.temperatura = data;
        this.cantTemperatura = this.temperatura.registros[this.temperatura.registros.length - 1].temperatura;
        this.dateTemperatura = this.temperatura.registros[this.temperatura.registros.length - 1].fecha_hora;

        let dataParam : number[] = [];
        let labelParam : string[] = [];
        let i = 0;
        if(this.temperatura.registros.length > 15){
          i = this.temperatura.registros.length - 15;
        }
        for(i = i; i < this.temperatura.registros.length; i++){
          dataParam.push(parseFloat(this.temperatura.registros[i].temperatura));
          labelParam.push(this.temperatura.registros[i].fecha_hora);
        }

        this.direcChartMethod(dataParam, labelParam);
      });

      this.cotizadorService.obtieneLuz().subscribe(data => {
        this.luz = data;
        this.cantLuz = this.luz.registros[this.luz.registros.length - 1].luz;
        this.dateLuz = this.luz.registros[this.luz.registros.length - 1].fecha_hora;

        let dataParam : number[] = [];
        let labelParam : string[] = [];
        let i = 0;
        if(this.luz.registros.length > 15){
          i = this.luz.registros.length - 15;
        }
        for(i = i; i < this.luz.registros.length; i++){
          dataParam.push(parseFloat(this.luz.registros[i].luz));
          labelParam.push(this.luz.registros[i].fecha_hora);
        }

        this.luzChartMethod(dataParam, labelParam);
      });

      this.cotizadorService.obtieneDireccionViento().subscribe(data => {
        this.direccion = data;
        this.cantDireccion = this.direccion.registros[this.direccion.registros.length - 1].direccion_viento;
        switch(this.cantDireccion){
          case "O":
            this.cantDireccion = "Oeste";
            break;
          case "E":
            this.cantDireccion = "Este";
            break;
          case "S":
            this.cantDireccion = "Sur";
            break;
          case "N":
            this.cantDireccion = "Norte";
            break;

        }
        this.dateDireccion = this.direccion.registros[this.direccion.registros.length - 1].fecha_hora;
      });
     
      await this.delay(3000);
      }
    })();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  vientoChartMethod(dataParam : number[], labelParam : string[]) {
    this.vientoChart = new Chart(this.vientoCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labelParam,
        datasets: [
          {
            label: 'Velocidad del viento',
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

  humedadChartMethod(dataParam : number[], labelParam : string[]) {
    this.humedadChart = new Chart(this.humedadCanvas.nativeElement, {
      type: 'line',
      data: {
        labels:labelParam,
        datasets: [
          {
            label: 'Humedad',
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

  direcChartMethod(dataParam : number[], labelParam : string[]) {
    this.direcChart = new Chart(this.direcCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labelParam,
        datasets: [
          {
            label: 'Temperatura',
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

  luzChartMethod(dataParam : number[], labelParam : string[]) {
    this.luzChart = new Chart(this.luzCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labelParam,
        datasets: [
          {
            label: 'Luz',
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
}