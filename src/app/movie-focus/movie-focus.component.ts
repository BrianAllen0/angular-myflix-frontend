import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UrlTrackerService } from '../url-tracker.service';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Movie, User, Director } from '../types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-focus',
  templateUrl: './movie-focus.component.html',
  styleUrls: ['./movie-focus.component.scss'],
})
export class MovieFocusComponent {
  movie!: Movie;
  paramSub!: Subscription;
  movieId: string = '';
  favoriteMovies: Movie[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public urlTracker: UrlTrackerService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.urlTracker.updateUrl(this.route.snapshot.url);
    const user = localStorage.getItem('userObject');

    if (!user) {
      this.router.navigate(['welcome']);
      return;
    }

    this.movieId = this.route.snapshot.paramMap.getAll('movieId')[0];

    this.getCurrentMovie(this.movieId);
    this.getUserMovieFavorites();
  }

  getCurrentMovie(movieId: string): void {
    console.log('GETTING MOVIE: ' + movieId);
    this.fetchApiData.getSpecificMovie(movieId).subscribe((resp: any) => {
      this.movie = resp;
    });
  }

  getDirectorIdByName(name: string): string {
    let directorId: string = '';
    let directorArray: Director[] = JSON.parse(
      localStorage.getItem('directors') || '[]'
    );
    directorArray.forEach((director: Director) => {
      if (director.Name === name) {
        directorId = director._id;
      }
    });
    return directorId;
  }

  goToDirector(name: string): void {
    let directorId: string = this.getDirectorIdByName(name);
    this.router.navigate([`directors/${directorId}`]);
  }

  goBack(): void {
    this.router.navigate([this.urlTracker.getLastUrl()]);
  }

  getUserMovieFavorites() {
    this.fetchApiData.getUser().subscribe((res) => {
      this.favoriteMovies = res.FavoriteMovies;
    });
  }

  isFavorite(movieId: string): boolean {
    return !!this.favoriteMovies.find((movie) => movie._id === movieId);
  }

  addFavorite(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((resp) => {
      console.log(resp);
      this.getUserMovieFavorites();
      this.snackBar.open('Added Favorite!', 'OK', {
        duration: 2000,
      });
      return resp;
    });
  }

  removeFavorite(movieId: string): void {
    console.log(movieId);
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe((resp: any) => {
      this.getUserMovieFavorites();
      this.snackBar.open('Removed Favorite!', 'OK', {
        duration: 2000,
      });
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
