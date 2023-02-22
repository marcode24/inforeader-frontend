import { Component } from '@angular/core';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  constructor(
    private authService: AuthService,
  ) { }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  showModal(to: 'login'|'register'): void {
    this.authService.showModalAuth(to);
  }

  logOut(): void {
    this.authService.logout();
  }

}
