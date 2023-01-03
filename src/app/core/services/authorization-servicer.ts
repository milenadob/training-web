import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from './local-serivce';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

    constructor(private router: Router, private localService: LocalService) { }

    getAuthKey() {
        const authKey = this.localService.getData('authorization');
        if (authKey == null) {
            this.router.navigate(['/login'])
            return null;
        }
        return authKey;
    }

}