import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DefaultModule} from "./layouts/default/default.module";
import {RouterModule} from "@angular/router";
import {FullPageModule} from "./layouts/fullpage/full-page.module";
import {FullPageAdminModule} from "./layouts/fullpageadmin/full-page-admin.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    DefaultModule,
    FullPageModule,
    FullPageAdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
