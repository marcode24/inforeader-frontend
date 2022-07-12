import { Component, OnInit } from '@angular/core';

import { WebsiteService } from '@services/website.service';

import { Website } from '@models/website.model';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.css']
})
export class WebsitesComponent implements OnInit {

  public websites: Website[];
  private isAuthenticated: boolean;

  constructor(
    private websiteService: WebsiteService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getWebsites();
  }

  getWebsites(): void {
    this.websiteService.getWebsites(true).subscribe({
      next: (websites) => {
        this.websites = websites;
        console.log(this.websites);
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  subscribeWebsite(id: string){
    this.isAuthenticated = this.authService.isAuthenticated();
    if(this.isAuthenticated) {
      this.userService.modifyPreferences(id, 'subscription').subscribe(resp => {
        this.websites.map(website => {
          if( website._id === id)
            website.inUser = !website.inUser;
        });
      });
    }
  }

}
