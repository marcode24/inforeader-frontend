import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SkeletonsModule } from 'app/shared/skeletons/skeletons.module';

import { WebsitesComponent } from './pages/websites/websites.component';

@NgModule({
  declarations: [
    WebsitesComponent
  ],
  imports: [
    CommonModule,
    SkeletonsModule
  ]
})
export class WebsiteModule { }
