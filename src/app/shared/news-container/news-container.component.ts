import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, debounceTime } from 'rxjs';

import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

import { Feed } from '@models/feed.model';

@Component({
  selector: 'app-news-container',
  templateUrl: './news-container.component.html',
  styleUrls: ['./news-container.component.css']
})
export class NewsContainerComponent implements OnInit {
  private isAuthenticated = false;
  @Input() feeds: Feed[] = [];
  @Input() recentFeed: Feed;
  @Output() moreItems: EventEmitter<boolean> = new EventEmitter();
  private saveFeedSub: Subject<string> = new Subject();

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {
     this.saveFeedSub.pipe(
      debounceTime(250))
      .subscribe((idFeed) => this.updatePreferences(idFeed)
    );
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  moreDetails(id: string): void {
    this.router.navigate([`/feed/${id}`]);
  }

  saveFeed(id: string) {
    if(!this.isAuthenticated) {
      return this.authService.showModalAuth('init');
    }
    this.saveFeedSub.next(id);
  }

  updatePreferences(idFeed: string): void {
    this.userService.modifyPreferences(idFeed, 'saved').subscribe(() => {
      this.feeds.map(feed => {
        if(feed._id === idFeed) {
          feed.inUser = !feed.inUser;
        }
      });
    });
  }

  changeStyle(element: HTMLElement, change: boolean): void {
    if(change) element.classList.add('bxs-bookmark');
    else element.classList.remove('bxs-bookmark');
  }

  onScroll(): void {
    this.moreItems.emit(true);
  }

}
