import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HtmlPipe } from 'app/core/pipes/html.pipe';
import { SharedModule } from 'app/shared/shared.module';
import { SkeletonsModule } from 'app/shared/skeletons/skeletons.module';

import { FeedComponent } from './pages/feed/feed.component';
import { SavedComponent } from './pages/saved/saved.component';

@NgModule({
  declarations: [
    FeedComponent,
    SavedComponent,
    HtmlPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    SkeletonsModule
  ]
})
export class FeedModule { }
