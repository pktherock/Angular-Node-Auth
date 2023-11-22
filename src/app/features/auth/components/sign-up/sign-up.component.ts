import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn) {
      this.router.navigate(['dashboard']);
    }
    this.signUpForm = new FormGroup({
      userName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmNewPassword: new FormControl(''),
    });
  }

  async onSignUpBtnClick() {
    const { userName, email, password, confirmNewPassword } =
      this.signUpForm.value;
    if (password === confirmNewPassword && email && userName) {
      const response = await this.authService.signUp(userName, email, password);

      if (typeof response === 'object') {
        this.alertService.success('Registered successfully.');
        this.router.navigate(['/auth/login']);
      }

    } else {
      this.alertService.error(
        'username, email is required, and password and confirm password should match!'
      );
    }
  }
}
