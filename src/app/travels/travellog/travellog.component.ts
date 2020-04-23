import { Component, OnInit } from '@angular/core';
import { TravellogService } from 'src/app/travellog.service';

@Component({
  selector: 'app-travellog',
  templateUrl: './travellog.component.html',
  styleUrls: ['./travellog.component.css']
})
export class TravellogComponent implements OnInit {

  constructor(private travellogService: TravellogService) { }

  ngOnInit(): void {
    console.log('GET THIS TRAVELS', this.travellogService.getHistoryTravel())
  }

}
