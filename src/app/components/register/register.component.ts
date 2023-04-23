import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../data/services/user.service";
import {Router} from "@angular/router";
import {User} from "../../shared/models/user.model";
import {Notify} from 'notiflix/build/notiflix-notify-aio';
import {ErrorAuthMessage} from "../../shared/models/ErrorAuthMessage";

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
              Notify.success('Register Ok', {
                position: 'center-bottom'
              });
              this.router.navigate(['/login']);
            }
          }
        );
      })
      .catch(e => {
        Notify.failure(ErrorAuthMessage.convertMessage(e.code), {
          position: 'center-bottom'
        });
      })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';

  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }

    return this.password.hasError('minlength') ? 'Password must be at least 6 characters' : '';
  }

  verifyDisabled() {
    if (this.registerPassword == '' || this.registerEmail == '') {
      return true;
    }

    return this.registerPassword.length < 6;

  }

}
