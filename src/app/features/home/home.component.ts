import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IResponseFeed } from '@interfaces/response.interface';

import { Feed } from '@models/feed.model';
import { Website } from '@models/website.model';
import { AuthService } from '@services/auth.service';

import { FeedService } from '@services/feed.service';
import { WebsiteService } from '@services/website.service';
import { forkJoin, map, Observable } from 'rxjs';

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
  private limit: number = 20;

  public feeds: Feed[] = [];
  public websites: Website[] = [];

  constructor(
    private feedService: FeedService,
    private websiteService: WebsiteService,
    private authService: AuthService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.getDataInitial();
  }

  getDataInitial() {
    forkJoin({
      feeds: this.getFeeds(),
      websites: this.websiteService.getWebsites(),
    }).subscribe({
      next: ({ feeds, websites }) => {
        this.feeds = feeds;
        this.websites = websites;
        console.log(this.feeds, this.websites);
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  getFeeds(): Observable<Feed[]> {
    return this.feedService.getFeeds(this.skip, this.limit).pipe(map(resp => resp.feeds));
  }

  onScroll() {
    this.skip += this.limit;
    this.getFeeds().subscribe(feeds => {
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
    const isAuth = this.authService.isAuthenticated();
    if(!isAuth) {
      console.log('no esta logeado');
    } else {
      console.log('si esta');
    }
  }

}
