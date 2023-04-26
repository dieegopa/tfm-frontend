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
import {Notify} from "notiflix/build/notiflix-notify-aio";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: Auth,
    private http: HttpClient,
    private cookies: CookieService,
    private router: Router,
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
    Notify.success('Has cerrado sesión correctamente', {
      position: 'center-top',
      distance: '4px',
      success: {
        background: '#0D9488',
        notiflixIconColor: '#ffffff',
      },
    });
    return signOut(this.auth)
  }

  registerBackend(user: User) {
    return this.http.post(
      environment.backendUrl + '/register', JSON.stringify(user),
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
}
