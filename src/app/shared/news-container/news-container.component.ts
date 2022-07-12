import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Feed } from '@models/feed.model';

import { AuthService } from '@services/auth.service';
import { FeedService } from '@services/feed.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-news-container',
  templateUrl: './news-container.component.html',
  styleUrls: ['./news-container.component.css']
})
export class NewsContainerComponent implements OnInit {
  private isAuthenticated: boolean = false;
  @Input() feeds: Feed[] = [];
  @Output() moreItems: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private feedService: FeedService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  moreDetails(id: string): void {
    const recentFeeds = this.feeds.slice(0, 6);
    this.feedService.setRecentsFeeds(recentFeeds);
    this.router.navigate([`/feed/${id}`]);
  }

  saveFeed(id: string){
    this.isAuthenticated = this.authService.isAuthenticated();
    if(!this.isAuthenticated) {
      console.log('no esta logeado');
    } else {
      this.userService.modifyPreferences(id, 'saved').subscribe(resp => {
        this.feeds.map(feed => {
          if(feed._id === id) {
            feed.inUser = !feed.inUser;
          }
        })
      })
    }
  }

  changeStyle(element: any, change: boolean): void {
    if(change) element.classList.add('bxs-bookmark');
    else element.classList.remove('bxs-bookmark')
  }

  onScroll(): void {
    this.moreItems.emit(true);
  }

}
