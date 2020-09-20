
export class ResponseVO {
    constructor (
        public title: string,
        public message: string,	
    	public error: string,
        public response: any,
        public typeMessage: string) {}

}