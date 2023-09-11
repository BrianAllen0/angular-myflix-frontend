import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://ba-movie-api.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  //////////// Endpoints ////////////
  public register(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'user/register', userDetails)
      .pipe(catchError(this.handleError));
  }

  public login(credentials: any): Observable<any> {
    return this.http
      .post(apiUrl + 'user/login', credentials)
      .pipe(catchError(this.handleError));
  }

  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(catchError(this.handleError));
  }

  public getSpecificMovie(movie: string): Observable<any> {
    return this.http.get(apiUrl + movie).pipe(catchError(this.handleError));
  }

  public getGenre(genre: string): Observable<any> {
    return this.http
      .get(apiUrl + '/genres/' + genre)
      .pipe(catchError(this.handleError));
  }

  public getDirector(director: string): Observable<any> {
    return this.http
      .get(apiUrl + '/directors/' + director)
      .pipe(catchError(this.handleError));
  }

  public getUser(user: string): Observable<any> {
    return this.http
      .get(apiUrl + '/user/' + user)
      .pipe(catchError(this.handleError));
  }

  public deleteUser(user: string): Observable<any> {
    return this.http
      .delete(apiUrl + '/user/unregister', user)
      .pipe(catchError(this.handleError));
  }

  public getUserFavorites(user: string): Observable<any> {
    return this.http
      .get(apiUrl + '/user/' + user)
      .pipe(catchError(this.handleError));
  }

  public addFavoriteMovie(user: string, movie: string): Observable<any> {
    return this.http
      .post(apiUrl + '/movies/favorites/add/' + movie, user)
      .pipe(catchError(this.handleError));
  }

  public deleteFavoriteMovie(userAndMovie: any): Observable<any> {
    return this.http
      .delete(apiUrl + '/movies/favorites/remove', userAndMovie)
      .pipe(catchError(this.handleError));
  }

  public updateUser(newData: any): Observable<any> {
    return this.http
      .patch(apiUrl + '/user/update' + newData)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
