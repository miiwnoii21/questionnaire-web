export class UserAuth {
    accountId: string;
    fullName: string;
    accessToken: string;
    expiredDate: Date;

    constructor(){
        this.accountId = "";
        this.fullName = "";
        this.accessToken = "";
        this.expiredDate = new Date();
    }
}
