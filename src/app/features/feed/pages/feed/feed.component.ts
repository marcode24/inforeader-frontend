import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FeedService } from '@services/feed.service';

import { Feed } from '@models/feed.model';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private feedService: FeedService,
  ) { }

  ngOnInit(): void {
    this.recentsFeed = this.feedService.getRecentsFeeds;
    this.activatedRoute.params.subscribe(({ feedID }) => this.getFeed(feedID));
  }

  getFeed(id: string): void {
    this.feedService.getFeed(id).subscribe((feed: Feed) => {
      this.feed = feed;
    })
  }

}
