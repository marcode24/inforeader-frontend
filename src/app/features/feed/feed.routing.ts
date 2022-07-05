import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { FeedComponent } from "./pages/feed/feed.component";

const routes: Routes = [
  {
    path: ':feedID',
    component: FeedComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule {}
