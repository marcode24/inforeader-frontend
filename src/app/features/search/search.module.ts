import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SkeletonsModule } from 'app/shared/skeletons/skeletons.module';

import { SearchComponent } from './pages/search/search.component';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SkeletonsModule,
    SharedModule
  ]
})
export class SearchModule { }
