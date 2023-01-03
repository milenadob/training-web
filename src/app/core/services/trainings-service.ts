import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Training } from '../model/training'
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { LocalService } from './local-serivce';
import { AuthorizationService } from './authorization-servicer';
import { TrainingUpdate } from '../model/training-update';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {

    trainingUrl: string = `${environment.apiUrl}/api/training`;

    constructor(private router: Router, private http: HttpClient, private localService: LocalService, 
        private authoriozationService: AuthorizationService) {}

    getAllTrainings(username: string): Observable<Training[]> {
        let header = new HttpHeaders({ "Authorization": "Bearer " + this.authoriozationService.getAuthKey() as string});
        
        return this.http.get<Training[]>(`${this.trainingUrl}/user/${username}`, {headers: header})
            .pipe(
            catchError(this.handleError<Training[]>('getAllTrainings', []))
          );
    }

    update(training: TrainingUpdate, trainingId: number): Observable<any> {
        let header = new HttpHeaders({ "Authorization": "Bearer " + this.authoriozationService.getAuthKey() as string});
        
        return this.http.put<any>(`${this.trainingUrl}/${trainingId}`, training, {headers: header})
            .pipe(
            catchError(this.handleError<any>('getAllTrainings', []))
          );
    }

    delete(trainingId: number): Observable<any> {
        let header = new HttpHeaders({ "Authorization": "Bearer " + this.authoriozationService.getAuthKey() as string});
        
        return this.http.delete<any>(`${this.trainingUrl}/${trainingId}`, {headers: header})
            .pipe(
            catchError(this.handleError<any>('getAllTrainings', []))
          );
    }
    
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.localService.clearData();
            this.router.navigate(['/login'])
            return of(result as T);
        };
    }
}