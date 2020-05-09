export class Travel {
    constructor(
        public travelId: string,
        public timestamp: Date,
        public product: string,
        public status: boolean,
        public endtimestamp: Date,
        public displayName: string,
        public description: string,
        public unity: string
    ) {}
}