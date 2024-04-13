import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Movie, User } from '../types';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: Movie[] = [];
  favoriteMovies: Movie[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    // const moviesInLocalStorage = localStorage.getItem('movies');
    // if (moviesInLocalStorage === null || moviesInLocalStorage === '[]') {

    const user = localStorage.getItem('userObject');

    if (!user) {
      this.router.navigate(['welcome']);
      return;
    }

    this.getMovies();
    this.getUserMovieFavorites();
    //   localStorage.setItem('movies', JSON.stringify(this.movies));
    // } else {
    //   this.movies = JSON.parse(localStorage.getItem('movies') || '[]');
    // }

    // this.userRef = localStorage.getItem('userObject');
    // this.userRef = JSON.parse(this.userRef);
    // this.favoriteMovies = this.userRef.FavoriteMovies;
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  getUserMovieFavorites() {
    this.fetchApiData.getUser().subscribe((res) => {
      this.favoriteMovies = res.FavoriteMovies;
    });
  }

  isFavorite(movieID: string): boolean {
    return !!this.favoriteMovies.find((movie) => movie._id === movieID);
  }

  addFavorite(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((resp) => {
      console.log(resp);
      this.getUserMovieFavorites();
      return resp;
    });
  }

  removeFavorite(movieId: string): void {
    console.log(movieId);
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe((resp: any) => {
      this.getUserMovieFavorites();
      return resp;
    });
  }

  showInfoModal(title: string, content: string): void {
    let dialogRef = this.dialog.open(InfoModalComponent, {
      width: '50%',
    });
    dialogRef.componentInstance.infoContent = content;
    dialogRef.componentInstance.infoTitle = title;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  goToProfile(): void {
    this.router.navigate(['profile']);
  }
}
