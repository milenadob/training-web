import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../model/user-login';
import { map, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

    usersUrl: string = `${environment.apiUrl}/api/user`;

    constructor(private http: HttpClient) {}

    login(user: UserLogin): Observable<any> {
        return this.http.post(`${this.usersUrl}/login`, user, {observe: 'response'});
    }

    register(user: User): Observable<any> {
        return this.http.post(`${this.usersUrl}/register`, user);
    }
}