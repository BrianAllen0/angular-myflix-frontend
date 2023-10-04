import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  favoriteMovieTitles: string[] = [];
  public userRef: any;
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.userRef = localStorage.getItem('userObject');
    this.userRef = JSON.parse(this.userRef);
    this.favoriteMovies = this.userRef.FavoriteMovies;
    console.log(this.userRef.FavoriteMovies);
    this.favoriteMovies.forEach((movie) => {
      this.favoriteMovieTitles.push(movie.title);
    });
    console.log(this.favoriteMovieTitles);
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  addFavorite(movie: string): void {
    this.fetchApiData
      .addFavoriteMovie(this.userRef.Username, movie)
      .subscribe((resp: any) => {
        return resp;
      });
  }

  removeFavorite(movie: string): void {
    let data = {
      Username: this.userRef.Username,
      Title: movie,
    };
    this.fetchApiData.deleteFavoriteMovie(data).subscribe((resp: any) => {
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
    // TODO: proper logout logic
    this.router.navigate(['welcome']);
  }

  goToProfile(): void {
    this.router.navigate(['profile']);
  }
}
