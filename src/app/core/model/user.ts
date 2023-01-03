export class User {
    username: string;
    password: string;
    height: number;
    weight: number;
    sex: string;
    birthday: string;
    
    constructor(username: string, password: string, height: number, 
        weight: number, sex: string, birthday: string) {
        this.username = username;
        this.password = password;
        this.height = height;
        this.weight = weight;
        this.sex = sex;
        this.birthday = birthday;
    }
}