import { Component, OnInit } from '@angular/core';
import { TravellogService } from 'src/app/travellog.service';
import { TravelLog } from './Travellog';

@Component({
  selector: 'app-travellog',
  templateUrl: './travellog.component.html',
  styleUrls: ['./travellog.component.css']
})
export class TravellogComponent implements OnInit {
  travelLogs : TravelLog []
  travelLog: TravelLog = new TravelLog("", null)
  
  constructor(private travellogService: TravellogService) { }

  ngOnInit(): void {
    this.travelLogs = this.getHistoryTravel()
  }

  getHistoryTravel(): TravelLog[]{
    return this.travellogService.getHistoryTravel()
  }

  getTravelbyId(id: string) {
    this.travelLog = this.travellogService.getTravelById(id)
  }

}
