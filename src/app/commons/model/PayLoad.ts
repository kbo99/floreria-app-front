
export class PayLoad {

    constructor (
        public perId: number,
        public nombre: string,
        public apeM: string,
        public apeP: string,
        public email: string,
        public user_name: string,
        public authorities: string[]
        ) {}
}