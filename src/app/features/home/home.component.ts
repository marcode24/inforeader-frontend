import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, map, Observable, Subscription } from 'rxjs';

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

  public isLoading: boolean = true;
  private isAuthenticated: boolean = false;

  private skip: number = 0;
  private limit: number = 10;

  public websites: Website[] = [];
  public feeds: Feed[] = [];

  private isAuthenticatedSub: Subscription;

  constructor(
    private feedService: FeedService,
    private websiteService: WebsiteService,
    private authService: AuthService,
  ) { }

  ngOnDestroy(): void {
    this.isAuthenticatedSub.unsubscribe();
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.getDataInitial();
    this.isAuthenticatedSub = this.authService.isAuthenticatedEmitter.subscribe(resp => resp ? this.resetDataInitial(): '');
  }

  resetDataInitial() {
    this.isAuthenticated = true;
    // fixed it - using service or emitter
    document.body.scrollTop = 0; // this is for Safari
    document.documentElement.scrollTop = 0; // for another one
    this.skip = 0;
    this.getDataInitial();
  }

  getDataInitial() {
    this.isLoading = true;
    forkJoin({
      feeds: this.getFeeds(),
      websites: this.websiteService.getWebsites(),
    }).subscribe({
      next: ({ feeds, websites }) => {
        this.feeds = feeds;
        this.websites = websites;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  getFeeds(): Observable<Feed[]> {
    return this.feedService.getFeeds(this.skip, this.limit, this.isAuthenticated).pipe(map(feeds => feeds));
  }

  onScroll() {
    this.skip += this.limit;
    if(!this.isAuthenticated && this.skip >= this.limit) {
      return this.authService.showModalAuth();
    }
    this.getFeeds().subscribe(feeds => this.feeds = [...this.feeds, ...feeds]);
  }




}
