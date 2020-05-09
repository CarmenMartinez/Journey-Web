import { Component, OnInit } from '@angular/core';
import { TravellogService } from 'src/app/travellog.service';
import { TravelLog } from './Travellog';
import * as $ from 'jquery';
import * as CanvasJS from '../../../assets/canvasjs.min.js';
import { TravelService } from 'src/app/travel.service';
import { Travel } from '../travel/Travel';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-travellog',
  templateUrl: './travellog.component.html',
  styleUrls: ['./travellog.component.css']
})
export class TravellogComponent implements OnInit {
  id: string;
  travelLogs : TravelLog [];
  travelLog: TravelLog = new TravelLog("", null);
  currentTravel: Travel;
  latitude: number;
  longitude: number;
  zoom:number;
  chart;
  dataPoints; 
  
  constructor(private travellogService: TravellogService,
    private travelService: TravelService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    //get id from route
    this.id = this.route.snapshot.paramMap.get('id');

    //TODO: Get Travel logs using the id of the travel
    this.travelLogs = this.getHistoryTravel();
    this.setCurrentTravel();
    this.setCurrentTravelLog();
    if(this.dataPoints) {
      this.refresh();
    }
    else {
      this.dataPoints = [
        {x: 1, y: 10},
        {x: 2, y: 10.5},
        {x: 3, y: 10.3},
        {x: 4, y: 11},
        {x: 5, y: 12},
        {x: 6, y: 14},
        {x: 7, y: 9}
      ];
      this.renderChart();
    }

    this.setCurrentLocation();
  }

  formatDate(d: Date): String {
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }

  getCurrentTravel(): Travel{
    if(!this.currentTravel)
      return null;
    return this.currentTravel;
  }

  getHistoryTravel(): TravelLog[]{
    return this.travellogService.getHistoryTravel();
  }

  getTravelbyId(id: string) {
    this.travelLog = this.travellogService.getTravelById(id);
  }

  getTravelLogDateTemp(){
    let dateTemps = this.travelLog.logs.map((item) => {
      return {x: item.timestamp.getHours(), y: item.temperature};
    })
    return dateTemps;
  }

  setCurrentTravel(){
    this.currentTravel = this.travelService.getActiveTravel();
  }

  setCurrentTravelLog(){
    if(!this.currentTravel) return;
    this.setTravelLog(this.currentTravel.travelId);
  }

  setTravelLog(id: string){
    let index = this.travelLogs.findIndex((travel) => travel.travelId == id);
    if(index == -1) return;
    Object.assign(this.travelLog, this.travelLogs[index]);
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
 
  refresh(){
    this.setCurrentTravelLog()
    
    if(!this.travelLog.logs) return;
    
    this.refreshChart();
    this.refreshMap();
  }

  refreshChart(){
    let data = this.getTravelLogDateTemp();
    this.dataPoints = data;
    this.renderChart();
  }

  refreshMap(){
    let orderLogs = this.travelLog.logs.sort((a, b) => {      
      if (a.timestamp > b.timestamp){
        return -1;
      } 
      else if (a.timestamp == b.timestamp){
        return 0;
      }
      else return 1;
    })
    this.latitude = Number.parseFloat(orderLogs[0].location.lat)
    this.longitude = Number.parseFloat(orderLogs[0].location.long)
    this.zoom = 15;
  }

  renderChart(){
    this.chart = new CanvasJS.Chart("chartContainer",{
      exportEnabled: true,
      data: [{
        type: "spline",
        dataPoints : this.dataPoints,
      }]
    })
    this.chart.render();
  }
  

}
