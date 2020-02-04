import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from 'src/app/directives/click-outside.directive';

@NgModule({
  declarations: [ClickOutsideDirective],
  imports: [
    CommonModule
  ],
  exports: [
    ClickOutsideDirective
  ]
})
export class MainModule { }
