import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FeedService } from '@services/feed.service';

import { Feed } from '@models/feed.model';
import { forkJoin } from 'rxjs';
// use encapsulation to styles works correctly from css files
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeedComponent implements OnInit {
  public feed: Feed;
  public recentsFeed: Feed[];
  public isLoading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private feedService: FeedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ feedID }) => this.loadData(feedID));
  }

  loadData(id: string): void {
    this.isLoading = true;
    forkJoin({
      feed: this.feedService.getFeed(id),
      recentFeeds: this.feedService.getFeeds(0, 6, false),
    }).subscribe({
      next: ({ feed, recentFeeds }) => {
        this.feed = feed,
        this.recentsFeed = recentFeeds;
      },
      complete: () => this.isLoading = false,
    })
  }

  goToFeed(id: string): void {
    this.router.navigate([`/feed/${id}`]);
  }

}
