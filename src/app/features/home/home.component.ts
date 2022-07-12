import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class HomeComponent implements OnInit {

  public showGoUpButton: boolean = false;
  public loading: boolean = true;

  private showScrollHeight = 400;
  private hideScrollHeight = 200;

  private skip: number = 0;
  private limit: number = 10;

  public feeds: Feed[] = [];
  public websites: Website[] = [];

  private isAuthenticated: boolean = false;
  private activeSubscriptions: Subscription;


  changeStyle(element: any, change: boolean){
    if(change) element.classList.add('bxs-bookmark');
    else element.classList.remove('bxs-bookmark')
  }

  constructor(
    private feedService: FeedService,
    private websiteService: WebsiteService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.validateToken().subscribe(resp => {
      this.isAuthenticated = resp;
      this.getDataInitial();
    });

    this.activeSubscriptions = this.feedService.changeNews.subscribe(value => {
      if(!value && this.isAuthenticated) {
        this.isAuthenticated = value;
      }
      this.scrollTop();
      this.skip = 0;
      this.getDataInitial();
    })
  }

  getDataInitial() {
    forkJoin({
      feeds: this.getFeeds(),
      websites: this.websiteService.getWebsites(),
    }).subscribe({
      next: ({ feeds, websites }) => {
        this.feeds = feeds;
        this.websites = websites;
      }
    })
  }

  getFeeds(): Observable<Feed[]> {
    return this.feedService.getFeeds(this.skip, this.limit, this.isAuthenticated).pipe(map(resp => resp.feeds));
  }

  onScroll() {
    this.skip += this.limit;
    this.getFeeds().subscribe(feeds => {
      console.log({feeds});
      this.feeds = [...this.feeds, ...feeds];
    })
  }

  scrollTop() {
    document.body.scrollTop = 0; // this is for Safari
    document.documentElement.scrollTop = 0; // for another one
  }

  moreDetails(id: string): void {
    const recentFeeds = this.feeds.slice(0, 6);
    this.feedService.setRecentsFeeds(recentFeeds);
    this.router.navigate([`/feed/${id}`]);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (( window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if ( this.showGoUpButton && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  saveFeed(id: string){
    this.isAuthenticated = this.authService.isAuthenticated();
    if(!this.isAuthenticated) {
      console.log('no esta logeado');
    } else {
      console.log('si esta');
    }
  }

}
