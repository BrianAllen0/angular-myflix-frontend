import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UrlTrackerService } from '../url-tracker.service';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(
    public urlTracker: UrlTrackerService,
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.urlTracker.updateUrl(this.route.snapshot.url);
    this.storeLocalData();
  }

  storeLocalData(): void {
    this.fetchApiData.getAllDirectors().subscribe((resp: any) => {
      localStorage.setItem('directors', JSON.stringify(resp));
    });
    this.fetchApiData.getAllGenres().subscribe((resp: any) => {
      localStorage.setItem('genres', JSON.stringify(resp));
      console.log('resp', resp);
    });
  }

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
