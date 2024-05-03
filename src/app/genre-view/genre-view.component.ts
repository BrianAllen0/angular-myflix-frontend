import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UrlTrackerService } from '../url-tracker.service';
import { Genre } from '../types';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss'],
})
export class GenreViewComponent {
  genre!: Genre;
  genreId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fetchApiData: FetchApiDataService,
    private urlTracker: UrlTrackerService
  ) {}

  ngOnInit(): void {
    this.urlTracker.updateUrl(this.route.snapshot.url);

    this.genreId = this.route.snapshot.paramMap.getAll('genreId')[0];
    this.getGenre(this.genreId);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  getGenre(genreId: string): void {
    this.fetchApiData.getGenre(genreId).subscribe((resp: any) => {
      this.genre = resp;
    });
  }

  goBack(): void {
    this.router.navigate([this.urlTracker.getLastUrl()]);
    this.urlTracker.wentBack();
  }
}
