import {Injectable} from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "@angular/fire/auth";
import {HttpClient} from "@angular/common/http";
import {User} from "../../shared/models/user.model";
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: Auth,
    private http: HttpClient,
    private cookies: CookieService,
    private router: Router,
    private notificationService: NotificationService,
  ) {
  }

  register({email, password}: { email: string, password: string }) {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  login({email, password}: { email: string, password: string }) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    this.cookies.delete('authData');
    this.notificationService.showSuccesNotification('Has cerrado sesión correctamente');
    return signOut(this.auth)
  }

  registerBackend(user: User) {
    return this.http.post(
      environment.backendUrl + '/api/register', JSON.stringify(user),
      {observe: 'response'}
    );
  }

  isLogged() {
    if (this.cookies.get('authData')) {
      const cookieData = JSON.parse(this.cookies.get('authData'));
      if (new Date().getTime() > cookieData.validTime) {
        this.logout()
          .then(r => {
              this.router.navigate(['/']);
            }
          )
          .catch(e => {
            console.log(e);
          })
      }
      return new Date().getTime() <= cookieData.validTime;
    }

    return false;
  }

  getUserSub() {
    if (this.cookies.get('authData')) {
      const cookieData = JSON.parse(this.cookies.get('authData'));
      return cookieData.userSub;
    }
  }
}
