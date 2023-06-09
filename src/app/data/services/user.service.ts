import {Injectable} from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
} from "@angular/fire/auth";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../shared/models/user.model";
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {map} from "rxjs";
import {UserRegister} from "../../shared/models/userregister.model";

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

  getHeaders() {
    const cookieData = JSON.parse(this.cookies.get('authData'));
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + cookieData.token
    );
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

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  logout() {
    this.cookies.delete('authData');
    this.deleteDB();
    return signOut(this.auth)
  }

  registerBackend(user: UserRegister) {
    return this.http.post(
      environment.backendUrl + '/api/register', JSON.stringify(user),
      {observe: 'response'}
    );
  }

  isLogged() {
    const auth = getAuth();
    const user = auth.currentUser;

    return !!user;

  }

  getUserSub() {
    if (this.cookies.get('authData')) {
      const cookieData = JSON.parse(this.cookies.get('authData'));
      return cookieData.userSub;
    }
  }

  deleteDB() {
    window.indexedDB.databases().then((r) => {
      for (var i = 0; i < r.length; i++) { // @ts-ignore
        window.indexedDB.deleteDatabase(r[i].name);
      }
    }).then(() => {
    });
  }

  getUserData() {
    return this.http.get<User>(environment.backendUrl + '/api/users/' + this.getUserSub(),
      {headers: this.getHeaders(), observe: 'response'}
    ).pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getUserEmail() {
    if (this.cookies.get('authData')) {
      const cookieData = JSON.parse(this.cookies.get('authData'));
      return cookieData.username;
    }
  }

  changePassword(password: string) {
    const auth = getAuth();
    const user = auth.currentUser;
    return updatePassword(user!, password);
  }

  deleteUserFirebase() {
    const auth = getAuth();
    const user = auth.currentUser;
    return deleteUser(user!);
  }

  deleteUserBackend() {
    return this.http.delete(
      environment.backendUrl + '/api/users/' + this.getUserSub(),
      {headers: this.getHeaders(), observe: 'response'}
    );
  }
}
