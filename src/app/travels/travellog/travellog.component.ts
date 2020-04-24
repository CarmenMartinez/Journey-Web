import { Component, OnInit } from '@angular/core';
import { TravellogService } from 'src/app/travellog.service';
import { TravelLog } from './Travellog';
import * as $ from 'jquery';
import * as CanvasJS from '../../../assets/canvasjs.min.js';

@Component({
  selector: 'app-travellog',
  templateUrl: './travellog.component.html',
  styleUrls: ['./travellog.component.css']
})
export class TravellogComponent implements OnInit {
  travelLogs : TravelLog []
  travelLog: TravelLog = new TravelLog("", null)
  latitude: number;
  longitude: number;
  zoom:number;
  
  constructor(private travellogService: TravellogService) { }

  ngOnInit(): void {
    this.travelLogs = this.getHistoryTravel()
    let dataPoints = [
      {x: 1, y: 10},
      {x: 2, y: 10.5},
      {x: 3, y: 10.3},
      {x: 4, y: 11},
      {x: 5, y: 12},
      {x: 6, y: 14},
      {x: 7, y: 9}
    ];
    let chart = new CanvasJS.Chart("chartContainer",{
      exportEnabled: true,
      data: [{
        type: "spline",
        dataPoints : dataPoints,
      }]
    })
    chart.render()
    this.setCurrentLocation();
  }

  getHistoryTravel(): TravelLog[]{
    return this.travellogService.getHistoryTravel()
  }

  getTravelbyId(id: string) {
    this.travelLog = this.travellogService.getTravelById(id)
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
 


  

}
