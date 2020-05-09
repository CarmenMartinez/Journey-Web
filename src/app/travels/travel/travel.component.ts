import { Component, OnInit } from '@angular/core';
import { TravelService } from 'src/app/travel.service';
import { Travel } from './Travel';
import { TravellogService } from 'src/app/travellog.service';
import { TravelLog } from '../travellog/Travellog';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {
  activeTravel: Travel;
  travels: Travel[] = [];

  travelLogs: TravelLog[] = [];
  
  private travelSubscript: Subscription;
  private travelLogSubscript: Subscription;

  
  constructor(private travelService: TravelService,
    private travelLogService: TravellogService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.getTravels();
      this.getTravelLogs();
      this.activeTravel = this.getActiveTravel();
      this.travelSubscript = this.travelService.travelSubject
      .subscribe(
        (travelsArray: Travel[]) => {
           this.travels = travelsArray;
        }
      );

      this.travelLogSubscript = this.travelLogService.travelLogSubject
      .subscribe(
        (logsArray: TravelLog[]) => {
           this.travelLogs = logsArray;
        }
      );
  }

  getActiveTravel(): Travel{
    return this.travelService.getActiveTravel();
  }

  createTravel(product: string){
    this.travelService.createTravel(product);
  }

  formatDate(d: Date): String {
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }

  getTravels(){
    this.travels = this.travelService.getTravels();
  }

  getTravelLogs() {
    this.travelLogs = this.travelLogService.getHistoryTravel();
  }

  getTravelLogsById(id: string) {
    let travel: TravelLog = this.travelLogService.getTravelById(id);
    if(travel) {
      return this.travelLogService.getTravelById(id).logs;
    } else {
      return null;
    }
  }

  refreshTravels() {
    this.travelService.refreshTravels();
  }

  refreshTravelLogs() {
    this.travelLogService.refreshTravelLogs();
  }

  stopTravel(travelID: string) {
    this.travelService.stopTravel(travelID);
  }

  travelInfo(travel: Travel) {
    this.router.navigate([travel.travelId], {relativeTo: this.route});
  }

  

}
