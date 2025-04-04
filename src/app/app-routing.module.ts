import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from "./modules/product/product.component";
import {HomeComponent} from "./modules/home/home.component";
import {DefaultComponent} from "./layouts/default/default.component";
import {FullPageComponent} from "./layouts/fullpage/full-page.component";
import {LoginComponent} from "./modules/login/login.component";
import {FullPageAdminComponent} from "./layouts/fullpageadmin/full-page-admin.component";
import {AdminComponent} from "./modules/admin/admin.component";
import {AdminProductComponent} from "./modules/admin/admin-product/admin-product.component";
import {
  AdminProductUpdateComponent
} from "./modules/admin/admin-product/admin-product-update/admin-product-update.component";
import {AdminProductAddComponent} from "./modules/admin/admin-product/admin-product-add/admin-product-add.component";
import {ProductDetailsComponent} from "./modules/product-details/product-details.component";
import {AdminCategoryComponent} from "./modules/admin/admin-category/admin-category.component";
import {
  AdminCategoryAddComponent
} from "./modules/admin/admin-category/admin-category-add/admin-category-add.component";
import {
  AdminCategoryUpdateComponent
} from "./modules/admin/admin-category/admin-category-update/admin-category-update.component";
import {CategoryComponent} from "./modules/category/category.component";
import {AdminReviewComponent} from "./modules/admin/admin-review/admin-review.component";
import {CartComponent} from "./modules/cart/cart.component";
import {OrderComponent} from "./modules/order/order.component";
import {AdminOrderUpdateComponent} from "./modules/admin/admin-order/admin-order-update/admin-order-update.component";
import {AdminOrderComponent} from "./modules/admin/admin-order/admin-order.component";
import {AdminOrderExportComponent} from "./modules/admin/admin-order/admin-order-export/admin-order-export.component";
import {AdminOrderStatsComponent} from "./modules/admin/admin-order/admin-order-stats/admin-order-stats.component";
import {AdminLoginComponent} from "./modules/admin/admin-login/admin-login.component";
import {FullPageAdminEmptyComponent} from "./layouts/fullpageadminempty/full-page-admin-empty.component";
import {adminAuthorizeGuard} from "./modules/admin/common/guard/admin-authorize.guard";
import {ProfileComponent} from "./modules/profile/profile.component";
import {profileAuthorizeGuard} from "./shared/common/guard/profile-authorize.guard";
import {LostPasswordComponent} from "./modules/login/lost-password/lost-password.component";
import {OrderNotificationComponent} from "./modules/order/order-notification/order-notification.component";

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'products', component: ProductComponent},
      {path: 'products/:slug', component: ProductDetailsComponent},
      {path: 'categories/:slug', component: CategoryComponent},
      {path: 'cart', component: CartComponent},
      {path: 'orders', component: OrderComponent},
      {path: 'orders/notifications/:orderHash', component: OrderNotificationComponent},
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [profileAuthorizeGuard]
      },
      {path: 'lostPassword', component: LostPasswordComponent},
      {path: 'lostPassword/:hash', component: LostPasswordComponent}
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
      {path: 'admin', component: AdminComponent, canActivate: [adminAuthorizeGuard]},
      {path: 'admin/products', component: AdminProductComponent, canActivate: [adminAuthorizeGuard]},
      {path: 'admin/products/update/:id', component: AdminProductUpdateComponent, canActivate: [adminAuthorizeGuard]},
      {path: 'admin/products/add', component: AdminProductAddComponent, canActivate: [adminAuthorizeGuard]},
      {path: 'admin/categories', component: AdminCategoryComponent, canActivate: [adminAuthorizeGuard]},
      {path: 'admin/categories/add', component: AdminCategoryAddComponent, canActivate: [adminAuthorizeGuard]},
      {
        path: 'admin/categories/update/:id',
        component: AdminCategoryUpdateComponent,
        canActivate: [adminAuthorizeGuard]
      },
      {path: 'admin/reviews', component: AdminReviewComponent, canActivate: [adminAuthorizeGuard]},
      {path: 'admin/orders', component: AdminOrderComponent, canActivate: [adminAuthorizeGuard]},
      {path: 'admin/orders/update/:id', component: AdminOrderUpdateComponent, canActivate: [adminAuthorizeGuard]},
      {path: 'admin/orders/export', component: AdminOrderExportComponent, canActivate: [adminAuthorizeGuard]},
      {path: 'admin/orders/stats', component: AdminOrderStatsComponent, canActivate: [adminAuthorizeGuard]},
    ]
  },
  {
    path: '',
    component: FullPageAdminEmptyComponent,
    children: [
      {path: 'admin/login', component: AdminLoginComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
