import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserChangeInfoFormComponent } from '../user-change-info-form/user-change-info-form.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  constructor(public dialogRef: MatDialogRef<UserChangeInfoFormComponent>) {}
}
