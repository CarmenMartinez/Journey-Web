
export class TravelLog {
    constructor (
        public travelId: string,
        public logs: Log []
    ){}
}

export class Log {
    constructor (
        public timestamp: Date,
        public deviceId: string,
        public location: Location,
        public temperature: number
    ){}
}

export class Location {
    constructor (
        public lat: string,
        public long: string 
    ){}
}

