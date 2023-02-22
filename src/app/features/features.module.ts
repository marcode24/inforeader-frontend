import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthModule } from 'app/auth/auth.module';
import { SharedModule } from 'app/shared/shared.module';

import { ComponentsModule } from '@components/components.module';

import { FeaturesComponent } from './features.component';
import { FeedModule } from './feed/feed.module';
import { HomeModule } from './home/home.module';
import { SearchModule } from './search/search.module';
import { SettingsModule } from './settings/settings.module';
import { WebsiteModule } from './website/website.module';

@NgModule({
  declarations: [
    FeaturesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    FeedModule,
    WebsiteModule,
    AuthModule,
    HomeModule,
    SharedModule,
    SettingsModule,
    SearchModule
  ]
})
export class FeaturesModule { }
