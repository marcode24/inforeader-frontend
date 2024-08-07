import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, Subscription, debounceTime } from 'rxjs';

import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { WebsiteService } from '@services/website.service';

import { Website } from '@models/website.model';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.css']
})
export class WebsitesComponent implements OnInit, OnDestroy {

  public websites: Website[];
  private websiteSub: Subscription;
  private loadingWebsites: Subject<boolean> = new Subject();
  public isLoading = false;

  constructor(
    private websiteService: WebsiteService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.isLoading = true;
    this.loadingWebsites.pipe(debounceTime(1000)).subscribe(() => this.getWebsites());
  }

  ngOnDestroy(): void {
    this.websiteSub.unsubscribe();
  }

  ngOnInit(): void {
    this.loadingWebsites.next(true);
    this.websiteSub = this.authService.isAuthenticatedEmitter.subscribe(({isAuth}) =>{
      if(isAuth) {
        this.isLoading = true;
        this.loadingWebsites.next(true);
      }
    });
  }

  getWebsites(): void {
    this.websiteService.getWebsites({ all: true }).subscribe({
      next: (websites) => {
        this.websites = websites;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  subscribeWebsite(id: string) {
    if(!this.authService.isAuthenticated()) {
      return this.authService.showModalAuth('init');
    }
    this.userService.modifyPreferences(id, 'subscription').subscribe(() => {
      this.websites.map(website => {
        if( website._id === id)
          website.inUser = !website.inUser;
      });
    });
  }

}
