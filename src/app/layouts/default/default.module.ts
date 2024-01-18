import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FlexModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {ReplacePipe} from "../../modules/common/pipe/replace-pipe";

@NgModule({
  declarations: [ReplacePipe],
  exports: [
    ReplacePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexModule,
    ReactiveFormsModule
  ]
})
export class DefaultModule {
}
