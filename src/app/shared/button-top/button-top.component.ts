import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-button-top',
  templateUrl: './button-top.component.html',
  styleUrls: ['./button-top.component.css']
})
export class ButtonTopComponent {
  public showGoUpButton = false;

  private showScrollHeight = 400;
  private hideScrollHeight = 200;

  scrollTop() {
    document.body.scrollTop = 0; // this is for Safari
    document.documentElement.scrollTop = 0; // for another one
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (( window.scrollY
      || document.documentElement.scrollTop
      || document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton
      && (window.scrollY
        || document.documentElement.scrollTop
        || document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

}
