import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegRequest } from '../types';
import { Router } from '@angular/router';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData: UserRegRequest = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  registerUser(): void {
    const userDataUpdate = {
      ...this.userData,
      Birthday: Date.parse(this.userData.Birthday).toString(),
    };
    this.fetchApiData.register(userDataUpdate).subscribe({
      next: (result) => {
        this.dialogRef.close();
        this.snackBar.open('Registered successfully!', 'OK', {
          duration: 2000,
        });
        this.dialog.open(UserLoginFormComponent, {
          width: '280px',
        });
      },
      error: (result) => {
        this.snackBar.open('Registration failed!', 'OK', {
          duration: 2000,
        });
      },
    });
  }
  closeRegistration(): void {
    this.dialogRef.close();
  }
}
