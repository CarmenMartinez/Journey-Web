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
  travelLog: TravelLog = new TravelLog("", null);
  currentTravel: Travel = new Travel("", null, "", null, null, "", "", "");
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
    
    this.setCurrentTravelLog(this.id);
    this.setCurrentTravel(this.id);
    
    this.refresh();
  }

  formatDate(d: Date): String {
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }

  getTravelLogDateTemp(){
    if(!this.travelLog) return;
    let dateTemps = this.travelLog.logs.map((item) => {
      return {x: item.timestamp.getHours(), y: item.temperature};
    })
    return dateTemps;
  }

  setCurrentTravel(id: string){
    this.currentTravel = this.travelService.getTravel(id);
  }

  setCurrentTravelLog(id: string){
    this.travelLog = this.travellogService.getTravelById(id);
  }
 
  fetchAndRefresh(){
    this.setCurrentTravel(this.id)
    this.setCurrentTravelLog(this.id)
    if(!this.travelLog){
      return;
    }
    this.refresh()
  }

  refresh(){
    this.refreshChart();
    this.refreshMap();
  }

  refreshChart(){
    let data = this.getTravelLogDateTemp();
    if(data)
      this.dataPoints = data;
    this.renderChart();
  }

  refreshMap(){
    if(!this.travelLog) return;
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
