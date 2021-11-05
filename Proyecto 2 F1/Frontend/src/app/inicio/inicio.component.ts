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
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements AfterViewInit  {
  horariosInicio: string[] = [];
  horariosFin: string[] = [];
  primerHorario: boolean = false;
  segundoHorario: boolean = false;
  tercerHorario: boolean = false;
  cuartoHorario: boolean = false;
  
  constructor( private cotizadorService: CotizadorService, private appService: AppServiceService) {

  }

  ngAfterViewInit() {
    (async () => { 
      while(true){
        this.cotizadorService.horariosDeUso().subscribe(data => {

          if(data.data.length  >= 4){
            this.primerHorario = true;
            this.horariosInicio.push(data.data[data.data.length - 1].inicio);
            this.horariosInicio.push(data.data[data.data.length - 2].inicio);
            this.horariosInicio.push(data.data[data.data.length - 3].inicio);
            this.horariosInicio.push(data.data[data.data.length - 4].inicio);

            this.horariosFin.push(data.data[data.data.length - 1].fin);
            this.horariosFin.push(data.data[data.data.length - 2].fin);
            this.horariosFin.push(data.data[data.data.length - 3].fin);
            this.horariosFin.push(data.data[data.data.length - 4].fin);

          }
          if(data.data.length  >= 8){
            this.segundoHorario = true;
            this.horariosInicio.push(data.data[data.data.length - 5].inicio);
            this.horariosInicio.push(data.data[data.data.length - 6].inicio);
            this.horariosInicio.push(data.data[data.data.length - 7].inicio);
            this.horariosInicio.push(data.data[data.data.length - 8].inicio);

            this.horariosFin.push(data.data[data.data.length - 5].fin);
            this.horariosFin.push(data.data[data.data.length - 6].fin);
            this.horariosFin.push(data.data[data.data.length - 7].fin);
            this.horariosFin.push(data.data[data.data.length - 8].fin);
          }
          if(data.data.length  >= 12){
            this.tercerHorario = true;
            this.horariosInicio.push(data.data[data.data.length - 9].inicio);
            this.horariosInicio.push(data.data[data.data.length - 10].inicio);
            this.horariosInicio.push(data.data[data.data.length - 11].inicio);
            this.horariosInicio.push(data.data[data.data.length - 12].inicio);

            this.horariosFin.push(data.data[data.data.length - 9].fin);
            this.horariosFin.push(data.data[data.data.length - 10].fin);
            this.horariosFin.push(data.data[data.data.length - 11].fin);
            this.horariosFin.push(data.data[data.data.length - 12].fin);
          }
          if(data.data.length  >=16){
            this.cuartoHorario = true;
            this.horariosInicio.push(data.data[data.data.length - 13].inicio);
            this.horariosInicio.push(data.data[data.data.length - 14].inicio);
            this.horariosInicio.push(data.data[data.data.length - 15].inicio);
            this.horariosInicio.push(data.data[data.data.length - 16].inicio);

            this.horariosFin.push(data.data[data.data.length - 13].fin);
            this.horariosFin.push(data.data[data.data.length - 14].fin);
            this.horariosFin.push(data.data[data.data.length - 15].fin);
            this.horariosFin.push(data.data[data.data.length - 16].fin);
          }

        });
      await this.delay(3000);
      }
   })();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}