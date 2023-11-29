import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FlexModule} from "@angular/flex-layout";
import {MaterialModule} from "./material.module";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FlexModule,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    FlexModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
