import { Injectable } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UrlTrackerService {
  private lastUrl: string = '';
  private currentUrl: string = '';
  private urlList: string[] = [];

  constructor(private router: Router) {}

  public getLastUrl(): string {
    return this.lastUrl;
  }

  public getCurrentUrl(): string {
    return this.currentUrl;
  }

  public wentBack(): void {
    if (this.urlList.length === 0) {
      // fallback in case we have no state
      this.router.navigate(['welcome']);
    }
    this.urlList.pop();
    this.currentUrl = this.urlList[this.urlList.length - 1];
    this.lastUrl = this.urlList[this.urlList.length - 2];
  }

  public updateUrl(urlArray: UrlSegment[]): void {
    let newUrlString: string = '';
    urlArray.forEach((element) => {
      newUrlString += element.path + '/';
    });
    this.urlList.push(newUrlString); // keep list of visited pages in order
    this.currentUrl = this.urlList[this.urlList.length - 1];
    this.lastUrl = this.urlList[this.urlList.length - 2];
  }
}
