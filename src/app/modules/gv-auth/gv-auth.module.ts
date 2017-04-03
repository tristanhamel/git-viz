import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthComponent } from './user-auth/user-auth.component';

@NgModule({
  declarations: [UserAuthComponent],
  imports: [
    CommonModule
  ],
  exports: [
    UserAuthComponent
  ]
})
export class GvAuthModule { }
