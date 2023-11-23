import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "./material.module";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    MaterialModule
  ],
  exports: [FooterComponent, HeaderComponent, SidebarComponent, MaterialModule]
})
export class SharedModule {
}
