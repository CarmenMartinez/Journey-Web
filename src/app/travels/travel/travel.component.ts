import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TravelService } from 'src/app/travel.service';
import { Travel } from './Travel';
import { TravellogService } from 'src/app/travellog.service';
import { TravelLog } from '../travellog/Travellog';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit, AfterViewInit {
  activeTravel: Travel;
  travels: Travel[] = [];

  travelLogs: TravelLog[] = [];
  
  constructor(private travelService: TravelService,
    private travelLogService: TravellogService) { }

  ngOnInit(): void {
      this.getTravels();
      this.getTravelLogs();
      this.activeTravel = this.getActiveTravel();
  }

  ngAfterViewInit(): void {
    //this.activeTravel = this.getActiveTravel();
    //this.getTravels();
    //this.getTravelLogs();

  }
  getActiveTravel(): Travel{
    return this.travelService.getActiveTravel();
  }

  createTravel(product: string){
    this.travelService.createTravel(product);
  }

  stopTravel(travelID: string) {
    this.travelService.stopTravel(travelID);
  }

  getTravels(){
    this.travels = this.travelService.getTravels();
  }

  getTravelLogs() {
    this.travelLogs = this.travelLogService.getHistoryTravel();
  }
}
