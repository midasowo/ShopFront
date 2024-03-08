import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {JwtService} from "../../../../shared/common/service/jwt.service";

export const adminAuthorizeGuard: CanActivateFn = async () => {
  const router = inject(Router)
  const jwt = inject(JwtService)

  if (jwt.getToken()) {
    return true
  }
  router.navigateByUrl('/admin/login')
  return false
}
