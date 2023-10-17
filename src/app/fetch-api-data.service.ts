import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GeneralResponse,
  Movie,
  User,
  UserLoginRequest,
  UserLoginResponse,
  UserRegRequest,
} from './types';

//Declaring the api url that will provide data for the client app
const apiUrl = 'http://localhost:8080/'; //'https://ba-movie-api.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  //////////// Endpoints ////////////
  public register(userDetails: UserRegRequest): Observable<any> {
    return this.http
      .post(apiUrl + 'user/register', userDetails)
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  public login(credentials: UserLoginRequest): Observable<UserLoginResponse> {
    return this.http
      .post<UserLoginResponse>(`${apiUrl}user/login`, credentials)
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  public getAllMovies(): Observable<Movie[]> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Movie[]>(`${apiUrl}movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getSpecificMovie(movieId: string): Observable<Movie> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Movie>(`${apiUrl}movie`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  public getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genres/' + genre, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'directors/' + director, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getUser(user: string): Observable<User> {
    const token = localStorage.getItem('token');
    return this.http
      .get<User>(`${apiUrl}user/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}user/unregister`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  public addFavoriteMovie(movieId: string): Observable<GeneralResponse> {
    const token = localStorage.getItem('token');
    return this.http
      .post<GeneralResponse>(`${apiUrl}movies/favorites/add/${movieId}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  public deleteFavoriteMovie(movieId: string): Observable<GeneralResponse> {
    const token = localStorage.getItem('token');
    return this.http
      .put<GeneralResponse>(
        `${apiUrl}movies/favorites/remove/${movieId}`,
        null,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  public updateUser(newData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .patch(apiUrl + 'user/update', newData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  private extractResponseData<T>(res: T): T {
    return res;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = undefined;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }
    return throwError(() => ({
      message: error.error || 'error fetching data',
    }));
  }
}
