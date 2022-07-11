import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  private sidebar: any;
  private wrapper: any;
  public userActive: User;
  constructor(
    private authService: AuthService,
  ) {
    this.userActive = authService.getUserActive;
  }

  ngAfterViewInit(): void {
    this.sidebar = document.querySelector('.sidebar');
    this.wrapper = document.querySelector('.wrapper');
  }

  ngOnInit(): void {
    this.authService.isAuthenticatedEmitter.subscribe(resp => {
      if(resp) {
        this.setUserInfoActive();
      }
    });
  }

  setUserInfoActive(): void {
    this.userActive = this.authService.getUserActive;
    console.log(this.userActive);
  }

  toggled(element: any) {
    console.log(this.userActive);
    this.sidebar?.classList.toggle('open');
    this.wrapper.classList.toggle('open');
    console.log(this.sidebar);
    if(this.sidebar?.classList.contains('open')) {
      element.classList.replace('bx-menu', 'bx-menu-alt-right');//replacing the iocns class
    } else {
      element.classList.replace('bx-menu-alt-right','bx-menu');//replacing the iocns class
    }
  }

}
