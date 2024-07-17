import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, debounceTime } from 'rxjs';

import { OptionFeed } from '@customTypes/option.type';

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
  private saveFeedSub: Subject<{id: string, option: OptionFeed}> = new Subject();

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {
     this.saveFeedSub.pipe(
      debounceTime(300))
      .subscribe(({id, option}) => this.updatePreferences(id, option)
    );
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  moreDetails(id: string): void {
    this.router.navigate([`/feed/${id}`]);
  }

  modifyPreference(id: string, option: OptionFeed): void {
    if(!this.isAuthenticated) {
      return this.authService.showModalAuth('init');
    }
    this.saveFeedSub.next({id, option});
  }

  updatePreferences(idFeed: string, option: OptionFeed): void {
    this.userService.modifyPreferences(idFeed, option).subscribe(() => {
      this.feeds.map(feed => {
        if(option === 'saved' && feed._id === idFeed) {
          feed.inUser = !feed.inUser;
        }
        if(option === 'liked' && feed._id === idFeed) {
          feed.liked = !feed.liked;
          feed.liked ? feed.likes++ : feed.likes--;
        }
      });
    });
  }

  changeStyle(element: HTMLElement, strClass: string, change: boolean): void {
    if(change) {
      element.classList.add(strClass);
      element.style.transition = 'all 0.5s';
    }
    else {
      element.classList.remove(strClass);
    }
  }

  onScroll(): void {
    this.moreItems.emit(true);
  }
}
