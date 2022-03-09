export class UserChangePassword{
    email: string;
    currentPassword: string;
    newPassword: string;
    constructor(email: string, currentPassword: string, newPassword: string){
        this.email = email;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }
}