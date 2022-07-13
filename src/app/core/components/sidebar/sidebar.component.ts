import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { FeedService } from '@services/feed.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  private sidebar: any;
  private wrapper: any;
  public userActive: User;
  private userActiveSubscription: Subscription;

  public isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private feedService: FeedService,
    private router: Router
  ) {
    this.userActive = authService.getUserActive;
  }

  ngOnDestroy(): void {
    this.userActiveSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.sidebar = document.querySelector('.sidebar');
    this.wrapper = document.querySelector('.wrapper');
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userActiveSubscription = this.authService.isAuthenticatedEmitter.subscribe(resp => {
      if(resp) {
        this.setUserInfoActive();
        this.isAuthenticated = true;
      };
    });
  }

  setUserInfoActive(): void {
    this.userActive = this.authService.getUserActive;
  }

  changeExplore(value: boolean): void {
    this.router.navigate(['/']);
    this.feedService.changeToExplore(value);
  }

  navigate(route: string): void {
    if(!this.isAuthenticated) {
      return this.authService.showModalAuth();
    }
    this.router.navigate([route]);
  }

}
