import {Injectable} from '@angular/core';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  adminAccess = false

  setToken(token: string) {
    localStorage.setItem("token", token)
  }

  getToken(): string | null {
    return localStorage.getItem("token")
  }

  removeToken() {
    localStorage.removeItem("token")
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem("token")
    return token != null && this.notExpired(token);
  }

  private notExpired(token: string) {
    let tokenDecoded = jwtDecode<any>(token)
    return (tokenDecoded.exp * 1000) > new Date().getTime();
  }

  public setAdminAccess(adminAccess: boolean) {
    this.adminAccess = adminAccess
  }

  public getAdminAccess(): boolean {
    return this.adminAccess
  }
}
