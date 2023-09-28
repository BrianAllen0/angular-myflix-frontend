import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserChangeInfoFormComponent } from '../user-change-info-form/user-change-info-form.component';

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
  public userRef: any;
  private birthdayDate: Date = new Date();
  public userBirthday: string = '';

  ngOnInit(): void {
    this.userRef = localStorage.getItem('userObject');
    console.log(this.userRef);
    this.userRef = JSON.parse(this.userRef);
    this.birthdayDate = new Date(this.userRef.Birthday);
    this.userBirthday =
      this.birthdayDate.getMonth() +
      '/' +
      this.birthdayDate.getDate() +
      '/' +
      this.birthdayDate.getFullYear();
  }

  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  logout(): void {
    // TODO: proper logout logic
    this.router.navigate(['welcome']);
  }

  openChangeUserInfoDialog(): void {
    this.dialog.open(UserChangeInfoFormComponent, {
      width: '280px',
    });
  }
}
