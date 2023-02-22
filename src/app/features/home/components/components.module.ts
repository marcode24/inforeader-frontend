import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebsitesCardComponent } from './websites-card/websites-card.component';

@NgModule({
  declarations: [
    WebsitesCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    WebsitesCardComponent,
  ]
})
export class ComponentsModule { }
