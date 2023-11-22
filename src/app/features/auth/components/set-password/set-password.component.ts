import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css'],
})
export class SetPasswordComponent {
  token!: string;
  userId!: string;
  isTokenValid: boolean = false;
  hidePassword: boolean = true;
  setPasswordForm!: FormGroup;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.token = this.route.snapshot.queryParams['token'];
    this.userId = this.route.snapshot.queryParams['id'];
    if (!(this.token && this.userId)) {
      this.alertService.error(
        'token and useId is required to access this page'
      );
      this.router.navigate(['auth/login']);
    }

    this.setPasswordForm = new FormGroup({
      otp: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }

  async ngOnInit() {
    if (this.token && this.userId) {
      const response = await this.fetchTokenValidity();
      this.loading = false
      if (response) {
        this.isTokenValid = true;
      } else {
        this.isTokenValid = false;
      }
    }
  }

  async fetchTokenValidity() {
    const response = await this.authService.getTokenValidity(
      this.token,
      this.userId
    );
    if (typeof response === 'object') {
      return response.tokenValid as boolean;
    } else {
      return false;
    }
  }

  async onSetPasswordBtnClick() {
    const { otp, password, confirmPassword } = this.setPasswordForm.value;

    if (otp && password.trim() && password === confirmPassword) {
      const response = await this.authService.setPassword(
        this.token,
        this.userId,
        otp,
        password
      );

      if (response === null) {
        this.alertService.success(
          'Password reset successful, please login with your new password.'
        );
        this.router.navigate(['/auth/login']);
      }
    }
  }
}
