import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {JwtService} from "../../../../shared/common/service/jwt.service";

export const adminAuthorizeGuard: CanActivateFn = async () => {
  const router = inject(Router)
  const jwtService = inject(JwtService)

  if (!jwtService.isLoggedIn() || !jwtService.getAdminAccess()) {
    router.navigateByUrl('/admin/login')
    return false
  }
  return true
}
