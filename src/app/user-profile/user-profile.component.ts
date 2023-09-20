import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  @Input() updatedInfo = { Password: '', Email: '' };
  constructor(
    //public dialogRef: MatDialogRef<UserChangeInfoFormComponent>,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) {}

  changeInfo(): void {
    this.fetchApiData.updateUser(this.updatedInfo).subscribe(
      (result) => {
        this.snackBar.open('Updated info successfully!', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open('Failed to update info!', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
