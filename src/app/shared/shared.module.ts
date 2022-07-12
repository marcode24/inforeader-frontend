import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsContainerComponent } from './news-container/news-container.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    NewsContainerComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
  ],
  exports: [
    NewsContainerComponent
  ]
})
export class SharedModule { }
