import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsitesCardComponent } from './websites-card/websites-card.component';

@NgModule({
  declarations: [
    WebsitesCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WebsitesCardComponent,
  ]
})
export class ComponentsModule { }
