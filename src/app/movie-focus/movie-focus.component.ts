import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UrlTrackerService } from '../url-tracker.service';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Movie, User } from '../types';
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

  goBack(previousURL: string): void {}

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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
