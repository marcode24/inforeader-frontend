import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { NewsContainerComponent } from './news-container/news-container.component';
import { ButtonTopComponent } from './button-top/button-top.component';

@NgModule({
  declarations: [
    NewsContainerComponent,
    ButtonTopComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
  ],
  exports: [
    NewsContainerComponent,
    ButtonTopComponent
  ]
})
export class SharedModule { }
