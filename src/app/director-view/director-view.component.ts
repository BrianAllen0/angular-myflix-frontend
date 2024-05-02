import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UrlTrackerService } from '../url-tracker.service';
import { Director } from '../types';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss'],
})
export class DirectorViewComponent {
  director!: Director;
  directorId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fetchApiData: FetchApiDataService,
    private urlTracker: UrlTrackerService
  ) {}

  ngOnInit(): void {
    this.urlTracker.updateUrl(this.route.snapshot.url);

    this.directorId = this.route.snapshot.paramMap.getAll('directorId')[0];
  }

  goBack(): void {
    this.router.navigate([this.urlTracker.getLastUrl()]);
  }

  getDirector(directorId: string): void {
    this.fetchApiData.getDirector(directorId).subscribe((resp: any) => {
      this.director = resp;
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  goToProfile(): void {
    this.router.navigate(['profile']);
  }
}
