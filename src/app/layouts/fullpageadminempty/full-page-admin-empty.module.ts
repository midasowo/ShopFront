import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../../shared/material.module";
import {FlexModule} from "@angular/flex-layout";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FlexModule,
    MaterialModule
  ]
})
export class FullPageAdminEmptyModule {
}
