import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, forkJoin, map, Observable, Subject, Subscription } from 'rxjs';

import { Feed } from '@models/feed.model';
import { Website } from '@models/website.model';

import { AuthService } from '@services/auth.service';
import { FeedService } from '@services/feed.service';
import { WebsiteService } from '@services/website.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private loadingNews: Subject<boolean> = new Subject();
  public isLoading: boolean = true;
  private isAuthenticated: boolean = false;

  private skip: number = 0;
  private limit: number = 10;

  public websites: Website[] = [];
  public feeds: Feed[] = [];
  public recentFeed: Feed;

  private isAuthenticatedSub: Subscription;

  constructor(
    private feedService: FeedService,
    private websiteService: WebsiteService,
    private authService: AuthService,
  ) {
    this.loadingNews.pipe(debounceTime(1000)).subscribe(() => this.getDataInitial());
   }

  ngOnDestroy(): void {
    this.isAuthenticatedSub.unsubscribe();
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.loadingNews.next(true);
    this.isAuthenticatedSub = this.authService.isAuthenticatedEmitter.subscribe(({isAuth}) => isAuth ? this.resetDataInitial(): '');
  }

  resetDataInitial() {
    this.isAuthenticated = true;
    this.skip = 0;
    this.getDataInitial();
  }

  reloadData() {
    this.isLoading = true;
    this.loadingNews.next(true);
  }

  getDataInitial() {
    document.body.scrollTop = 0; // this is for Safari
    document.documentElement.scrollTop = 0; // for another one
    this.skip = 0;
    this.isLoading = true;
    forkJoin({
      feeds: this.getFeeds(),
      websites: this.websiteService.getWebsites(),
    }).subscribe({
      next: ({ feeds, websites }) => {
        this.feeds = feeds;
        this.websites = websites;
        this.setRecentFeed(0);
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  private setRecentFeed(index: number): void {
    if(index < this.feeds.length) {
      const item = this.feeds[index];
      if(!item.image || item.image === '') {
        return this.setRecentFeed(index + 1);
      } else {
        this.recentFeed = item;
      }
    }
  }

  getFeeds(): Observable<Feed[]> {
    return this.feedService.getFeeds(this.skip, this.limit, this.isAuthenticated).pipe(map(feeds => feeds));
  }

  onScroll() {
    this. skip += this.limit;
    if(!this.isAuthenticated && this.skip >= this.limit) {
      return this.authService.showModalAuth('init');
    }
    this.getFeeds().subscribe(feeds => this.feeds = [...this.feeds, ...feeds]);
  }

  get getSkip(): number {
    return this.skip;
  }

}
