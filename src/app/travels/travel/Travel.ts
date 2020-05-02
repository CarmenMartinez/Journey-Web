export class Travel {
    constructor(
        public travelId: string,
        public timestamp: Date,
        public product: string,
        public status: boolean
    ) {}
}