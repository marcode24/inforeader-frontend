import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { Observable, Subject, map } from 'rxjs';

import { Feed } from '@models/feed.model';

import { IResponseFeed } from '@interfaces/response.interface';

import Storage from '@utils/storage.util';

import { AuthService } from './auth.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private recentFeeds: Feed[];
  public changeNews: Subject<boolean> = new Subject();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  public changeToExplore(value: boolean): void {
    this.changeNews.next(value);
  }

  get headers() {
    return {
      headers: {
        'x-token': Storage.getItem('x-token'),
      },
    };
  }

  getFeeds(skip = 0, limit = 10, isAuthenticated = false): Observable<Feed[]> {
    const url = (!isAuthenticated) ?
    `${base_url}/feed?skip=${skip}&limit=${limit}` :
    `${base_url}/feed/byUser/subscription?skip=${skip}&limit=${limit}`;
    const headers = !isAuthenticated ? {} : this.headers;
    return this.http.get<IResponseFeed>(url, headers)
      .pipe(map(resp => this.mapInUserResource(resp.feeds) as Feed[]));
  }

  getFeed(id: string): Observable<Feed> {
    const url = `${base_url}/feed/${id}`;
    return this.http.get<IResponseFeed>(url)
      .pipe(map((resp) => this.mapInUserResource(resp.feed) as Feed));
  }

  getSavedFeeds(skip = 0, limit = 10): Observable<Feed[]> {
    const url = `${base_url}/feed/byUser/saved?skip=${skip}&limit=${limit}`;
    return this.http.get<IResponseFeed>(url, this.headers)
      .pipe(map((resp) => this.mapInUserResource(resp.feeds) as Feed[]));
  }

  searchFeeds(skip = 0, limit = 10, query: string): Observable<Feed[]> {
    const url = `${base_url}/feed/search?skip=${skip}&limit=${limit}&q=${query}`;
    return this.http.get<IResponseFeed>(url).pipe(map(resp => resp.feeds));
  }

  public mapInUserResource(feeds: Feed[] | Feed): Feed[] | Feed {
    const userActive = this.authService.getUserActive();
    if (userActive) {
      const { savedFeeds, likedFeeds } = userActive;
      const mapFeed = (feed: Feed): Feed => {
          feed.inUser = savedFeeds?.includes(feed._id) || false;
          feed.liked = likedFeeds?.includes(feed._id) || false;
          feed.likes = feed.likes ?? 0;
          return feed;
      };
      Array.isArray(feeds) ? feeds.forEach(mapFeed) : feeds = mapFeed(feeds);
    }
    return feeds;
  }
}
