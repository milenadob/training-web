import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../model/user-login';
import { catchError, map, Observable, of } from 'rxjs';
import { UserRegister } from '../model/user-register';
import { UserView } from '../model/user-view';
import { AuthorizationService } from './authorization-servicer';
import { LocalService } from './local-serivce';
import { Router } from '@angular/router';
import { UserUpdate } from '../model/user-update';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

    usersUrl: string = `${environment.apiUrl}/api/user`;
    
    constructor(private router: Router, private http: HttpClient, private localService: LocalService, 
        private authoriozationService: AuthorizationService) {}


    login(user: UserLogin): Observable<any> {
        return this.http.post(`${this.usersUrl}/login`, user, {observe: 'response'});
    }

    register(user: UserRegister): Observable<any> {
        return this.http.post(`${this.usersUrl}/register`, user);
    }

    get(username: string): Observable<UserView> {
        let header = new HttpHeaders({ "Authorization": "Bearer " + this.authoriozationService.getAuthKey() as string});
        return this.http.get<UserView>(`${this.usersUrl}/${username}`, {headers: header})
    }

    update(user: UserUpdate, username: string): Observable<UserView> {
        let header = new HttpHeaders({ "Authorization": "Bearer " + this.authoriozationService.getAuthKey() as string});
        return this.http.put<UserView>(`${this.usersUrl}/${username}`, user, {headers: header});
    }

    delete(username: string): Observable<any> {
        let header = new HttpHeaders({ "Authorization": "Bearer " + this.authoriozationService.getAuthKey() as string});
        return this.http.delete(`${this.usersUrl}/${username}`, {headers: header});
    }
}