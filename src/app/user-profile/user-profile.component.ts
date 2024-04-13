import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserChangeInfoFormComponent } from '../user-change-info-form/user-change-info-form.component';
import { Movie, User } from '../types';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  public userBirthday: string = '';
  favoriteMovies: Movie[] = [];
  userRef: User = {
    _id: '',
    Username: '',
    Password: '',
    Birthday: '',
    FavoriteMovies: [],
    Email: '',
  };

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.fetchApiData.getUser().subscribe((res) => {
      this.userRef = {
        ...res,
        Birthday: formatDate(res.Birthday, 'MM-dd-yyyy', 'en-US', '+0000'), //ensure the timezone is UTC
      };
      this.favoriteMovies = res.FavoriteMovies;
    });
  }

  addFavorite(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((resp: any) => {
      this.getUserData();
    });
  }

  removeFavorite(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe((resp) => {
      this.getUserData();
    });
  }

  showInfoModal(title: string, content: string): void {
    let dialogRef = this.dialog.open(InfoModalComponent, {
      width: '50%',
    });
    dialogRef.componentInstance.infoContent = content;
    dialogRef.componentInstance.infoTitle = title;
  }

  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  openChangeUserInfoDialog(): void {
    this.dialog.open(UserChangeInfoFormComponent, {
      width: '280px',
      data: this.userRef, //passing data to dialog box
    });
  }
}
