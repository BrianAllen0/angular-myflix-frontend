import { Injectable } from '@angular/core';
import { UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UrlTrackerService {
  private lastUrl: string = '';
  private currentUrl: string = '';

  constructor() {}

  public getLastUrl(): string {
    return this.lastUrl;
  }

  public getCurrentUrl(): string {
    return this.currentUrl;
  }

  public updateUrl(urlArray: UrlSegment[]): void {
    // we're about to update - the current is assigned to the last and the argument is assigned to the current
    this.lastUrl = this.currentUrl;
    let newUrlString!: string;
    urlArray.forEach((element) => {
      newUrlString += element + '/';
    });
    this.currentUrl = newUrlString;
  }
}
