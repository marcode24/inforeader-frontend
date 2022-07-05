import { Component, OnInit } from '@angular/core';

import { WebsiteService } from '@services/website.service';

import { Website } from '@models/website.model';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.css']
})
export class WebsitesComponent implements OnInit {

  public websites: Website[];

  constructor(
    private websiteService: WebsiteService
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

}
