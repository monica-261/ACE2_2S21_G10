import { IMyOptions } from 'ng-uikit-pro-standard';
import { Injectable } from '@angular/core';


@Injectable()
export class DatePickerService{

    options: IMyOptions = {
        // Strings and translations
        dayLabels: {su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab'},
        dayLabelsFull: {su: "Domingo", mo: "Lunes", tu: "Martes", we: "Miércoles", th: "Jueves", fr: "Viernes", sa:
        "Sábado"},
        monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10:
        'Oct', 11: 'Nov', 12: 'Dic' },
        monthLabelsFull: { 1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril", 5: "Mayo", 6: "Junio", 7: "Julio", 8:
        "Agosto", 9: "Septiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre" },       
        
        
        editableDateField: false,
        closeAfterSelect: true,
        todayBtnTxt: "Hoy",
        clearBtnTxt: "Limpiar",
        closeBtnTxt: "Cerrar",

        // Format
        dateFormat: 'dd/mm/yyyy',      
        
        // Year limits
        minYear: 1930,
        maxYear: 3000,    
       
        markCurrentDay: true,
        
        
        };

    public myDatePickerOptions(){
        return this.options;
    } 

}