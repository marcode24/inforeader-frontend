import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SkeletonsModule } from 'app/shared/skeletons/skeletons.module';

import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './home.component';
import { ExploreComponent } from './pages/explore/explore.component';

@NgModule({
  declarations: [
    HomeComponent,
    ExploreComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule,
    SkeletonsModule
  ]
})
export class HomeModule { }
