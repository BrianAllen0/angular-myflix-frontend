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
  birthdateString: string = '';
  deathdateString: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fetchApiData: FetchApiDataService,
    private urlTracker: UrlTrackerService
  ) {}

  ngOnInit(): void {
    this.urlTracker.updateUrl(this.route.snapshot.url);

    this.directorId = this.route.snapshot.paramMap.getAll('directorId')[0];
    this.getDirector(this.directorId);
  }

  goBack(): void {
    this.router.navigate([this.urlTracker.getLastUrl()]);
    this.urlTracker.wentBack();
  }

  formatDates(): void {
    let birthDate: Date = new Date(this.director.Birth);
    let deathDate: Date = new Date(this.director.Death);
    this.birthdateString = birthDate.toLocaleDateString(undefined, {
      timeZone: 'UTC',
    });
    if (deathDate.valueOf() !== 0) {
      // if date is 1/1/1970, don't assign string, ngif ensures deathdate isn't rendered
      // no one ever died on the unix epoch
      this.deathdateString = deathDate.toLocaleDateString(undefined, {
        timeZone: 'UTC',
      });
    }
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
