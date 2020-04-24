import { Injectable } from '@angular/core';
import { TravelLog, Location, Log } from './travels/travellog/Travellog';
import { HttpResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TravellogService {
  public travelLogs: TravelLog [] = [] 
  //public travel: TravelLog

  constructor(private http:HttpClient) {
    console.log(0)
    this.http.get('https://9vy4d36mji.execute-api.us-east-1.amazonaws.com/Sandbox/travels', {
      observe: 'response'
    })
      .subscribe(
      (res: HttpResponse<TravelLog[]>) => {
        console.log(1)
        console.log(res.body['TravelLogs'])
        let tlogs = res.body['TravelLogs']
        //this.setTravels(res.body['TravelLogs'])const ids = Object.keys(tlogs)
        const ids = Object.keys(tlogs)
        for (const id of ids){
          const logs = tlogs[id]['logs']
          
          let lgs : Log[] = []
          
          logs.forEach((l : TravelLog) => {
            let lng = new Location(l['location']['lat'],  l['location']['long'])
            let lg = new Log(l['deviceID'],l['timestamp'], lng, l['temperature'])
            lgs.push(lg)
          });

          let travelLog = new TravelLog(id, lgs)      
          this.travelLogs.push(travelLog)
        }  
      },
      err => console.log(err)
    );
   }

  private setTravels(tlogs: HttpResponse<TravelLog[]>) {
    const ids = Object.keys(tlogs)
    
    for (const id of ids){
      const logs = tlogs[id]['logs']
      
      let lgs : Log[] = []
      
      logs.forEach((l : TravelLog) => {
        let lng = new Location(l['location']['lat'],  l['location']['long'])
        let lg = new Log(l['deviceID'],l['timestamp'], lng, l['temperature'])
        lgs.push(lg)
      });

      let travelLog = new TravelLog(id, lgs)      
      this.travelLogs.push(travelLog)
    }  
  }

  getHistoryTravel(): TravelLog[] {
    console.log(3)
    return this.travelLogs
  }

  getTravelById (id: string): TravelLog {

    let iterator = this.travelLogs.values()
    //console.log(iterator.next().value)

    console.log(1)
    console.log(this.travelLogs)
    console.log(2)
    console.log(this.travelLogs.length)

    let index : number = this.travelLogs.findIndex((item) => {
      //console.log('HELLO', item)
      ///console.log(item.travelId)
      return item.travelId == id
    })
    index = 0
    //console.log(this.travelLogs.length)
    // console.log(typeof(this.travelLogs))
    // console.log(Object.keys(this.travelLogs))
    for(let i = 0; i < this.travelLogs.length; i++){
      //console.log('WHY', this.travelLogs[i].travelId)
      if(this.travelLogs[i].travelId == id){
        //console.log(this.travelLogs[i].travelId)
        index = i
        break
      }
    }
    //console.log(index)
    return this.travelLogs[index]
  }
}

