import { Component, Inject, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UrlTrackerService } from '../url-tracker.service';
import { UserChangeRequest } from '../types';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-change-info-form',
  templateUrl: './user-change-info-form.component.html',
  styleUrls: ['./user-change-info-form.component.scss'],
})
export class UserChangeInfoFormComponent {
  @Input() updatedInfo: UserChangeRequest = {
    Password: '',
    Email: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public urlTracker: UrlTrackerService,
    public dialogRef: MatDialogRef<UserChangeInfoFormComponent>,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.urlTracker.updateUrl(this.route.snapshot.url);
  }

  invalidInfoWarn(info: string): void {
    if (info === 'email') {
    } else {
    }
  }

  changeInfo(): void {
    const userUpdateInfo = {
      Password: this.updatedInfo.Password || '',
      Email: this.updatedInfo.Email || '',
    };

    this.fetchApiData.updateUser(userUpdateInfo).subscribe({
      next: (result) => {
        this.snackBar.open('Updated info successfully!', 'OK', {
          duration: 2000,
        });

        this.closeChangeInfoDialog();
      },
      error: (result) => {
        this.snackBar.open('Failed to update info!', 'OK', {
          duration: 2000,
        });
      },
    });
  }

  closeChangeInfoDialog(): void {
    this.dialogRef.close();
  }
}
