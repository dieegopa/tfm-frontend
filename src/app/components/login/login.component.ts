import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../data/services/user.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {Notify} from 'notiflix/build/notiflix-notify-aio';
import {ErrorAuthMessage} from "../../shared/models/errorauth.model";
import {User} from "../../shared/models/user.model";
import {NotificationService} from "../../data/services/notification.service";
import {UserRegister} from "../../shared/models/userregister.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faGoogle = faGoogle;

  authData: {
    token: string,
    validTime: number,
    username: string | null,
    userSub: string | null,
  } = {
    token: '',
    validTime: 0,
    username: '',
    userSub: '',
  }

  formLogin: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  loginEmail: string = '';
  loginPassword: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private cookies: CookieService,
    private notificationService: NotificationService,
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login({email: this.loginEmail.trim(), password: this.loginPassword.trim()})
      .then(r => {
        r.user.getIdToken(true)
          .then((idToken) => {
            this.authData.token = idToken;
            this.authData.validTime = new Date().getTime() + 3600 * 1000;
            this.authData.username = r.user.email;
            this.authData.userSub = r.user.uid;
            this.cookies.set('authData', JSON.stringify(this.authData));
          });
        this.notificationService.showSuccesNotification('Has iniciado sesión correctamente');
        this.router.navigate(['/main']);
      })
      .catch(e => {
        this.notificationService.showErrorNotification(ErrorAuthMessage.convertMessage(e.code))
      })
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then(r => {
        const user = new UserRegister(r.user.uid, r.user.email);
        this.userService.registerBackend(user).subscribe(
          r => {
            if (r.status == 200) {
              this.router.navigate(['/main']);
            }
          }
        );

        r.user.getIdToken(true)
          .then((idToken) => {
            this.authData.token = idToken;
            this.authData.validTime = new Date().getTime() + 3600 * 1000;
            this.authData.username = r.user.email;
            this.authData.userSub = r.user.uid;
            this.cookies.set('authData', JSON.stringify(this.authData));
          });
        this.notificationService.showSuccesNotification('Has iniciado sesión correctamente');
        this.router.navigate(['/main']);
      })
      .catch(e => {
        this.notificationService.showErrorNotification(ErrorAuthMessage.convertMessage(e.code))
      })
  }
}
