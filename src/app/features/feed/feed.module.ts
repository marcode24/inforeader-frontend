import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './pages/feed/feed.component';
import { HtmlPipe } from 'app/core/pipes/html.pipe';
import { SavedComponent } from './pages/saved/saved.component';

import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    FeedComponent,
    SavedComponent,
    HtmlPipe,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FeedModule { }
