import { Component, OnInit } from '@angular/core';
import { Feed } from '@models/feed.model';
import { FeedService } from '@services/feed.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {
  private skip: number = 0;
  private limit: number = 10;
  public feeds: Feed[];
  constructor(
    private feedService: FeedService,
  ) { }

  ngOnInit(): void {
    this.getSavedFeeds().subscribe(feeds => {
      console.log(feeds);
      this.feeds = feeds
    });
  }

  getSavedFeeds(): Observable<Feed[]> {
    return this.feedService.getSavedFeeds(this.skip, this.limit).pipe(map(feeds => feeds));
  }

  onScroll() {
    this.skip += this.limit;
    this.getSavedFeeds().subscribe(feeds => {
      console.log({feeds});
      this.feeds = [...this.feeds, ...feeds];
    })
  }

}
