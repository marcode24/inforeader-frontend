import { Component } from '@angular/core';

import { AuthService } from '@services/auth.service';
import { SettingService } from '@services/setting.service';

import { User } from '@models/user.model';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {

  public isLoading = true;

  constructor(
    private authService: AuthService,
    private settingService: SettingService ) {
    authService.validateToken().subscribe(() => {
      this.isLoading = false;
      const userActive: User = authService.getUserActive;
      if(userActive) {
        settingService.setTheme(userActive.darkMode ? 'dark' : 'light');
      }
    });
  }

}
