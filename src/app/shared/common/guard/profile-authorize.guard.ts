import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {JwtService} from "../service/jwt.service";

export const profileAuthorizeGuard: CanActivateFn = async () => {
  const router = inject(Router)
  const jwtService = inject(JwtService)

  if (!jwtService.isLoggedIn()) {
    router.navigateByUrl('/login')
    return false
  }
  return true
}
