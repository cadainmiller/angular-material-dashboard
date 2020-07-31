export class Users {
    id: string;
    username: string;
    email:string;
    password:string;

    constructor(id, username,email,password ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;

    }
}