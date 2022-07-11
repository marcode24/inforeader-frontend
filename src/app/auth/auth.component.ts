import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription;
  @ViewChild('modalAuth') modalAuth: ElementRef;
  private bodyElement = document.body as HTMLBodyElement;
  public showLogin: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticatedEmitter.subscribe(isAuth => !isAuth ? this.openModal() : '');
  }

  openModal(): void {
    this.bodyElement.classList.add('modal-open');
    this.modalAuth.nativeElement.classList.add('modal-open');
  }

  closeModal(): void {
    this.bodyElement.classList.remove('modal-open');
    this.modalAuth.nativeElement.classList.remove('modal-open');
  }

  changePage(value: boolean) {
    this.showLogin = value;
  }

}
