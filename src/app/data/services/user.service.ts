import {Injectable} from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "@angular/fire/auth";
import {HttpClient} from "@angular/common/http";
import {User} from "../../shared/models/user.model";
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: Auth,
    private http: HttpClient,
    private cookies: CookieService,
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
    this.cookies.delete('token');
    return signOut(this.auth)
  }

  registerBackend(user: User) {
    return this.http.post(
      environment.backendUrl + '/register', JSON.stringify(user),
      {observe: 'response'}
    );
  }
}
