import { Component, Inject, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserRegRequest } from '../types';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-change-info-form',
  templateUrl: './user-change-info-form.component.html',
  styleUrls: ['./user-change-info-form.component.scss'],
})
export class UserChangeInfoFormComponent {
  @Input() updatedInfo: UserRegRequest = {
    Password: '',
    Email: '',
    Username: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserChangeInfoFormComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: UserRegRequest //Needed to receive data from line 87 in UserProfileComponent
  ) {}

  ngOnInit(): void {
    this.updatedInfo = {
      ...this.updatedInfo,
      Username: this.data.Username,
      Email: this.data.Email,
      //'yyyy-MM-dd' must be in this format to pre-fill input field
      Birthday: formatDate(this.data.Birthday, 'yyyy-MM-dd', 'en-US', '+0000'),
    };
  }
  changeInfo(): void {
    const userUpdateInfo = {
      Username: this.updatedInfo.Username || this.data.Username,
      Password: this.updatedInfo.Password || '', // We are setting this to an empty string because the backend will only change password if its length is greater than 1
      Birthday: Date.parse(this.updatedInfo.Birthday) || this.data.Birthday,
      Email: this.updatedInfo.Email || this.data.Email,
    };

    this.fetchApiData.updateUser(userUpdateInfo).subscribe({
      next: (result) => {
        console.log(result);
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
