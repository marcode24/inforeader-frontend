import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterModule } from '@angular/router';

import { NewsContainerComponent } from './news-container/news-container.component';
import { ButtonTopComponent } from './button-top/button-top.component';
import { ToggleThemeComponent } from './toggle-theme/toggle-theme.component';
import { NewCardRecentComponent } from './new-card-recent/new-card-recent.component';

@NgModule({
  declarations: [
    NewsContainerComponent,
    ButtonTopComponent,
    ToggleThemeComponent,
    NewCardRecentComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    RouterModule
  ],
  exports: [
    NewsContainerComponent,
    ButtonTopComponent,
    ToggleThemeComponent,
  ]
})
export class SharedModule { }
