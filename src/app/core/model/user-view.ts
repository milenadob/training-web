export class UserView {
    username: string;
    height: number;
    weight: number;
    sex: string;
    birthday: string;
    
    constructor(username: string, height: number, 
        weight: number, sex: string, birthday: string) {
        this.username = username;
        this.height = height;
        this.weight = weight;
        this.sex = sex;
        this.birthday = birthday;
    }
}