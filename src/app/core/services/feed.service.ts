import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

import { IResponseFeed } from '@interfaces/response.interface';
import { Feed } from '@models/feed.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private recentFeeds: Feed[];

  constructor(private http: HttpClient) { }

  get getRecentsFeeds(): Feed[] {
    return this.recentFeeds;
  }

  setRecentsFeeds(feeds: Feed[]): void {
    this.recentFeeds = feeds;
  }

  getFeeds(skip = 0, limit = 20): Observable<IResponseFeed> {
    const url = `${base_url}/feed?skip=${skip}&limit=${limit}`;
    return this.http.get<IResponseFeed>(url);
  }

  getFeed(id: string): Observable<Feed> {
    const url = `${base_url}/feed/${id}`;
    return this.http.get<IResponseFeed>(url).pipe(map((resp) => resp.feed));
  }

}
