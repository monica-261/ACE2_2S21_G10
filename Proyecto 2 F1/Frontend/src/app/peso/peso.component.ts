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
  selector: 'app-peso',
  templateUrl: './peso.component.html',
  styleUrls: ['./peso.component.css']
})
export class PesoComponent implements AfterViewInit  {
  
  totalHoras: number;
  actualHoras: number;
  actual: boolean = false;
  @ViewChild('vientoCanvas', {static: false}) vientoCanvas: ElementRef;
  vientoChart: any;
  constructor( private cotizadorService: CotizadorService, private appService: AppServiceService) {

  }

  ngAfterViewInit() {
    (async () => { 
      while(true){
        this.cotizadorService.pesoActualPromedio().subscribe(data => {
          if(data.status == 200){
            this.actualHoras = data.data.peso;
            this.actual = true;
          }else{
            this.actual = false;
          }
        });

        this.cotizadorService.pesoHistorico().subscribe(data => {
          let datos = data.data;
  
          let dataParam : number[] = [];
          let labelParam : string[] = [];
          let i = 0;
          if(datos.length > 15){
            i = datos.length - 15;
          }
          for(i = i; i < datos.length; i++){
            dataParam.push(parseFloat(datos[i].peso));
            labelParam.push(datos[i].fecha_hora);
          }
  
          this.vientoChartMethod(dataParam, labelParam);
        });
      await this.delay(3000);
      }
    })();
  }

  vientoChartMethod(dataParam : number[], labelParam : string[]) {
    this.vientoChart = new Chart(this.vientoCanvas.nativeElement, {
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