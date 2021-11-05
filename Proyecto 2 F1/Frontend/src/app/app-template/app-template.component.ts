
import { AppServiceService } from '../_services/app-service.service';
import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-app-template',
  templateUrl: './app-template.component.html',
  styleUrls: ['./app-template.component.css']
})
export class AppTemplateComponent implements OnInit {

  public loadMenuTemplate: boolean = false;
  today= new Date();
  jstoday = '';

  constructor(
    private appService: AppServiceService
  ) { this.jstoday = formatDate(this.today, 'yyyy', 'en-US', '+0530');}

  ngOnInit() {}

}
