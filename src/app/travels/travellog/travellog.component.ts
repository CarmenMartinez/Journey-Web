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
  
  constructor(private travellogService: TravellogService) { }

  ngOnInit(): void {
    console.log(2)
    this.travelLogs = this.travellogService.getHistoryTravel()
    console.log(this.travelLogs)
    console.log(4)
    // console.log('GET THIS TRAVELS', t)
    // console.log('Id = 048b1b73-838c-11ea-9910-c3774c7a5de2', this.travellogService.getTravelById('048b1b73-838c-11ea-9910-c3774c7a5de2'))
    // let arr : number [] = []
    // arr.push(4)
    // console.log(arr)
  }
  
  getTravel(){
    this.travelLogs = this.travellogService.getHistoryTravel()
    console.log(this.travelLogs)
  }

}
