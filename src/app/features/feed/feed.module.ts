import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './pages/feed/feed.component';
import { HtmlPipe } from 'app/core/pipes/html.pipe';



@NgModule({
  declarations: [
    FeedComponent,
    HtmlPipe
  ],
  imports: [
    CommonModule
  ]
})
export class FeedModule { }
