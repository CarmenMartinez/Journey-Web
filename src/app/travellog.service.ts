import { Injectable } from '@angular/core';
import { TravelLog, Location, Log } from './travels/travellog/Travellog';
import { HttpResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TravellogService {
  travelLogs: TravelLog [] = [] 

  constructor(private http:HttpClient) {
    this.http.get('https://9vy4d36mji.execute-api.us-east-1.amazonaws.com/Sandbox/travels', {
      observe: 'response'
    }).subscribe(
      (res: HttpResponse<String>) => {
        this.setTravels(res.body['TravelLogs'])
      },
      err => console.log(err)
    );
   }

  private setTravels(tlogs) {
    const ids = Object.keys(tlogs)
    
    for (const id of ids){
      const logs = tlogs[id]['logs']
      
      let lgs : Log[] = []
      
      logs.forEach(l => {
        let lg: Log = {
          deviceId : l['deviceID'],
          timestamp : l['timestamp'],
          location : {
            lat: l['location']['lat'],
            long: l['location']['long']
          },
          temperature : l['temperature']
        }
        lgs.push(lg)
      });

      let travelLog: TravelLog = {
        travelId : id,
        logs : lgs
      }
      
      this.travelLogs.push(travelLog)
    }  
  }

  getHistoryTravel(): TravelLog[] {
    return this.travelLogs
  }

  getTravelById (){

  }
}

