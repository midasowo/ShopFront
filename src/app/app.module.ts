import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DefaultModule} from "./layouts/default/default.module";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FullPageModule} from "./layouts/fullpage/full-page.module";
import {FullPageAdminModule} from "./layouts/fullpageadmin/full-page-admin.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {JwtInterceptor} from "./modules/admin/common/interceptor/jwt.interceptor";

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
    FullPageAdminModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
