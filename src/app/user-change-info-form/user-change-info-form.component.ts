import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-change-info-form',
  templateUrl: './user-change-info-form.component.html',
  styleUrls: ['./user-change-info-form.component.scss'],
})
export class UserChangeInfoFormComponent {
  @Input() updatedInfo = { Password: '', Email: '' };

  constructor(
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
