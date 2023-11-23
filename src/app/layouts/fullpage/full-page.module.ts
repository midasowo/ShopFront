import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class FullPageModule {
}
