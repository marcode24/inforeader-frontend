import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthComponent
  ],
})
export class AuthModule { }
