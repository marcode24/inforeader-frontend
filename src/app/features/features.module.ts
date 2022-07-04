import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FeaturesComponent } from './features.component';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '@components/components.module';

@NgModule({
  declarations: [
    HomeComponent,
    FeaturesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule
  ]
})
export class FeaturesModule { }
