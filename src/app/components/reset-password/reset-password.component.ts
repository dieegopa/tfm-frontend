import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../data/services/notification.service";
import {UserService} from "../../data/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  formReg: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);

  resetEmail: string = '';

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private router: Router,
  ) {
    this.formReg = new FormGroup({
      email: this.email,
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.email.hasError('email') || this.email.hasError('required')) {
      this.notificationService.showErrorNotification('Debes ingresar un email válido');

      return;
    }

    this.userService.resetPassword(this.resetEmail).then(r => {
      this.notificationService.showSuccesNotification('Se ha enviado un correo para restablecer tu contraseña');
      this.router.navigate(['/login']);
    })

  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un email';
    }

    return this.email.hasError('email') ? 'Debes ingresar un email válido' : '';

  }

  verifyDisabled() {
    return this.resetEmail == '';
  }

}
