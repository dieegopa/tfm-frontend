import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../data/services/user.service";
import {Router} from "@angular/router";
import {ErrorAuthMessage} from "../../shared/models/errorauth.model";
import {NotificationService} from "../../data/services/notification.service";
import {UserRegister} from "../../shared/models/userregister.model";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
  formReg: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hide = true;

  registerEmail: string = '';
  registerPassword: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private cookies: CookieService,
  ) {
    this.formReg = new FormGroup({
      email: this.email,
      password: this.password,
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.register(this.formReg.value)
      .then(response => {
        const user = new UserRegister(response.user.uid, response.user.email);
        this.userService.registerBackend(user).subscribe(
          r => {
            if (r.status == 200) {
              this.notificationService.showSuccesNotification('Usuario registrado correctamente');
              response.user.getIdToken(true)
                .then((idToken) => {
                  this.authData.token = idToken;
                  this.authData.validTime = new Date().getTime() + 3600 * 1000;
                  this.authData.username = response.user.email;
                  this.authData.userSub = response.user.uid;
                  if(this.cookies.get('authData')) {
                    this.cookies.delete('authData');
                  }
                  this.cookies.set('authData', JSON.stringify(this.authData));
                  localStorage.setItem('logged', 'true');
                });
              this.router.navigate(['/main']).then(() => {
                setTimeout(() => {
                  window.location.reload();
                }, 500)
              });
            }
          }
        );
      })
      .catch(e => {
        this.notificationService.showErrorNotification(ErrorAuthMessage.convertMessage(e.code))
      })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un email';
    }

    return this.email.hasError('email') ? 'Debes ingresar un email válido' : '';

  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'Debes ingresar una contraseña';
    }

    return this.password.hasError('minlength') ? 'La contraseña debe tener al menos 6 caracteres' : '';
  }

  verifyDisabled() {
    if (this.registerPassword == '' || this.registerEmail == '') {
      return true;
    }

    return this.registerPassword.length < 6;

  }

}
