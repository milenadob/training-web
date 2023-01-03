export class UserUpdate {
    height: number;
    weight: number;
    sex: string;
    birthday: string;
    
    constructor(height: number, weight: number,
        sex: string, birthday: string) {
        this.height = height;
        this.weight = weight;
        this.sex = sex;
        this.birthday = birthday;
    }
}