import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from "./modules/product/product.component";
import {HomeComponent} from "./modules/home/home.component";
import {DefaultComponent} from "./layouts/default/default.component";
import {FullPageComponent} from "./layouts/fullpage/full-page.component";
import {LoginComponent} from "./modules/login/login.component";
import {FullPageAdminComponent} from "./layouts/fullpageadmin/full-page-admin.component";
import {AdminComponent} from "./modules/admin/admin.component";

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'products', component: ProductComponent}
    ]
  },
  {
    path: '',
    component: FullPageComponent,
    children: [
      {path: 'login', component: LoginComponent}
    ]
  },
  {
    path: '',
    component: FullPageAdminComponent,
    children: [
      {path: 'admin', component: AdminComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
