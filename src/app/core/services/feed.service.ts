import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map, Observable, Subject } from 'rxjs';

import { IResponseFeed } from '@interfaces/response.interface';
import { Feed } from '@models/feed.model';
import Storage from '@utils/storage.util';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private recentFeeds: Feed[];
  public changeNews: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) { }

  public changeToExplore(value: boolean): void{
    this.changeNews.next(value);
  }

  get headers() {
    return {
      headers: {
        'x-token': Storage.getItem('x-token'),
      },
    };
  }

  get getRecentsFeeds(): Feed[] {
    return this.recentFeeds;
  }

  setRecentsFeeds(feeds: Feed[]): void {
    this.recentFeeds = feeds;
  }

  getFeeds(skip = 0, limit = 10, isAuthenticated: boolean = false): Observable<IResponseFeed> {
    let url: string;
    if(!isAuthenticated) {
      url = `${base_url}/feed?skip=${skip}&limit=${limit}`;
      return this.http.get<IResponseFeed>(url);
    } else {
      url = `${base_url}/feed/byUser/subscription`;
      return this.http.get<IResponseFeed>(url, this.headers);
    }
  }

  getFeed(id: string): Observable<Feed> {
    const url = `${base_url}/feed/${id}`;
    return this.http.get<IResponseFeed>(url).pipe(map((resp) => resp.feed));
  }

}
