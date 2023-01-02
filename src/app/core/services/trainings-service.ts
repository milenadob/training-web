import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Training } from '../model/training'
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {

    trainingUrl: string = `${environment.apiUrl}/api/training`;

    constructor(private http: HttpClient) {}

    getAllTrainings(username: string): Observable<Training[]> {
        return this.http.get<Training[]>(`${this.trainingUrl}/user/${username}`)
            .pipe(
            catchError(this.handleError<Training[]>('getAllTrainings', []))
          );
    }
    
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            return of(result as T);
        };
    }
}