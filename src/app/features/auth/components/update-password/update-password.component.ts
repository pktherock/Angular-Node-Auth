import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit {
  updatePasswordForm!: FormGroup;
  hideOldPassword: boolean = true;
  hidePassword: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.updatePasswordForm = new FormGroup({
      oldPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmNewPassword: new FormControl(''),
    });
  }

  async onUpdatePasswordBtnClick() {
    const { oldPassword, newPassword, confirmNewPassword } =
      this.updatePasswordForm.value;
    if (newPassword === confirmNewPassword) {
      const res = await this.authService.updatePassword(
        oldPassword,
        newPassword
      );
      if (typeof res === 'object') {
        this.router.navigate(['dashboard']);
        this.alertService.success('Password updated successfully');
      }
    } else {
      this.alertService.error("password dose'nt match");
    }
  }
}
