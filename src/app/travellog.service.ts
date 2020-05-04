import { Injectable } from '@angular/core';
import { TravelLog, Location, Log } from './travels/travellog/Travellog';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravellogService {
  public travelLogs: TravelLog [] = [];

  travelLogSubject = new Subject<TravelLog[]>();

  constructor(private http:HttpClient) {
    this.requestTravelLogs();
  }

  getHistoryTravel(): TravelLog[] {
    console.log("FROM SERVICE ", this.travelLogs)
    return this.travelLogs;
  }

  getTravelById (id: string): TravelLog {
    let index = this.travelLogs.findIndex((item) => item.travelId == id)
    if(index == -1) return null
    return this.travelLogs[index]
  }

  pushChanges() {
    this.travelLogSubject.next(this.travelLogs.slice());
  }

  refreshTravelLogs() {
    this.requestTravelLogs();
    this.getHistoryTravel();
  }

  requestTravelLogs() {
    this.http.get('https://9vy4d36mji.execute-api.us-east-1.amazonaws.com/Sandbox/travels', {
      observe: 'response'
    })
      .subscribe(
      (res: HttpResponse<TravelLog[]>) => {
        this.setTravels(res.body['TravelLogs'])
      },
      err => console.log(err)
    );
  }

  private setTravels(tlogs: HttpResponse<TravelLog[]>) {
    const ids = Object.keys(tlogs);
    let inTravelLogs: TravelLog [] = [];
    for (const id of ids){
      const logs = tlogs[id]['logs'];
      
      let lgs : Log[] = [];
      
      logs.forEach((l : TravelLog) => {
        let lng = new Location(l['location']['lat'],  l['location']['long']);
        let newDate = new Date(Number(l['timestamp'])* 1000);
        let lg = new Log(newDate,l['deviceID'], lng, l['temperature']);
        lgs.push(lg)
      });

      let travelLog = new TravelLog(id, lgs);      
      inTravelLogs.push(travelLog);
    }
    Object.assign(this.travelLogs, inTravelLogs)  
  }
}

