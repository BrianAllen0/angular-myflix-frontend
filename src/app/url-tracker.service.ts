import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlTrackerService {
  private lastUrl: string = '';
  private currentUrl: string = '';

  constructor() {}

  public setLastURL(value: string) {
    this.lastUrl = value;
  }
  public getLastURL() {
    return this.lastUrl;
  }

  public setCurrentURL(value: string) {
    this.currentUrl = value;
  }
  public getCurrentURL() {
    return this.currentUrl;
  }
}
