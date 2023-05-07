import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../data/services/user.service";
import {Router} from "@angular/router";
import {User} from "../../shared/models/user.model";
import {ErrorAuthMessage} from "../../shared/models/errorauth.model";
import {NotificationService} from "../../data/services/notification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
      .then(r => {
        const user = new User(r.user.uid, r.user.email);
        this.userService.registerBackend(user).subscribe(
          r => {
            if (r.status == 200) {
              this.notificationService.showSuccesNotification('Usuario registrado correctamente');
              this.router.navigate(['/login']);
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
