import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-change-info-form',
  templateUrl: './user-change-info-form.component.html',
  styleUrls: ['./user-change-info-form.component.scss'],
})
export class UserChangeInfoFormComponent {
  @Input() updatedInfo = {
    Password: '',
    Email: '',
    Username: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserChangeInfoFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  changeInfo(): void {
    // const userUpdateInfo ={
    //   ...this.updatedInfo,
    // }
    this.fetchApiData.updateUser(this.updatedInfo).subscribe({
      next: (result) => {
        this.snackBar.open('Updated info successfully!', 'OK', {
          duration: 2000,
        });
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
