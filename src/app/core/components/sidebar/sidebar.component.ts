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
    this.userActiveSubscription = this.authService.isAuthenticatedEmitter.subscribe(resp => {
      if(resp) {
        this.setUserInfoActive();
      }
    });
  }

  setUserInfoActive(): void {
    this.userActive = this.authService.getUserActive;
  }

  changeExplore(value: boolean): void {
    if(!value) {
      if(!this.authService.isAuthenticated()) {
        return;
      }
    }
    this.router.navigate(['/']);
    this.feedService.changeToExplore(value);
  }

  // toggled(element: any) {
  //   console.log(this.userActive);
  //   this.sidebar?.classList.toggle('open');
  //   this.wrapper.classList.toggle('open');
  //   console.log(this.sidebar);
  //   if(this.sidebar?.classList.contains('open')) {
  //     element.classList.replace('bx-menu', 'bx-menu-alt-right');//replacing the iocns class
  //   } else {
  //     element.classList.replace('bx-menu-alt-right','bx-menu');//replacing the iocns class
  //   }
  // }

}
