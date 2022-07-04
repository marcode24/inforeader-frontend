import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FeaturesComponent } from './features.component';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '@components/components.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    HomeComponent,
    FeaturesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    InfiniteScrollModule
  ]
})
export class FeaturesModule { }
