import { Component } from '@angular/core';

import { Subject, debounceTime } from 'rxjs';

import { AuthService } from '@services/auth.service';
import { SettingService } from '@services/setting.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-toggle-theme',
  templateUrl: './toggle-theme.component.html',
  styleUrls: ['./toggle-theme.component.css']
})
export class ToggleThemeComponent {
  private themeChanged: Subject<boolean> = new Subject();
  constructor(
    private settingService: SettingService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.themeChanged.pipe(debounceTime(800))
      .subscribe(checked => this.userService.setTheme(checked));
  }

  changeTheme(event: Event): void {
    const checked = (event.target as HTMLInputElement)?.checked;
    if(this.authService.isAuthenticated()) {
      this.themeChanged.next(checked);
    }
    this.settingService.setTheme((checked) ? 'dark' : 'light' ); // set local
  }

  get isDarkMode(): boolean {
    return this.settingService.isDarkMode();
  }

}
