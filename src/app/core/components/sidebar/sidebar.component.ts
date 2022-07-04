import { AfterViewInit, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  private sidebar: any;
  private wrapper: any;
  constructor() { }

  ngAfterViewInit(): void {
    this.sidebar = document.querySelector('.sidebar');
    this.wrapper = document.querySelector('.wrapper');
  }

  ngOnInit(): void {
  }


  toggled(element: any) {
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
