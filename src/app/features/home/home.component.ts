import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IResponseFeed } from '@interfaces/response.interface';

import { Feed } from '@models/feed.model';

import { FeedService } from '@services/feed.service';

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

  constructor(
    private feedService: FeedService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.feedService.getFeeds(this.skip, this.limit).subscribe((resp: IResponseFeed) => {
      this.feeds = [...this.feeds, ...resp.feeds];
    })
  }

  onScroll() {
    this.skip += this.limit;
    this.ngOnInit();
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

}
