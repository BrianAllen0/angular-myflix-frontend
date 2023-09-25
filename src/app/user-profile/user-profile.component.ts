import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserChangeInfoFormComponent } from '../user-change-info-form/user-change-info-form.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  constructor(public dialog: MatDialog) {}

  openChangeUserInfoDialog(): void {
    this.dialog.open(UserChangeInfoFormComponent, {
      width: '280px',
    });
  }
}
