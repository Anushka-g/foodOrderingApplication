export class Usermodel {
    constructor(
        public name:string,
        public email:string,
        public id:string,
        public role:string,
        private _token:string
    ){}

    get token(){
        return this._token;
    }

}
