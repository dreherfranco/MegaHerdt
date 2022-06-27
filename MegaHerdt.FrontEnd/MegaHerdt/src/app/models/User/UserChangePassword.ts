export class UserChangePassword{
    userName: string;
    currentPassword: string;
    newPassword: string;
    constructor(userName: string, currentPassword: string, newPassword: string){
        this.userName = userName;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }
}