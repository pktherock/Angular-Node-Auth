import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css'],
})
export class UpdateEmailComponent implements OnInit {
  updateEmailForm!: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.updateEmailForm = new FormGroup({
      email: new FormControl(''),
    });
  }

  async onUpdateEmailBtnClick() {
    const { email } = this.updateEmailForm.value;
    if (email) {
      const res = await this.authService.verifyAndUpdateEmail(email);
      if (typeof res === 'object') {
        this.alertService.success(
          'Email change request link sended to your new email id.'
        );
        this.router.navigate(['dashboard']);
      }
    }
  }
}
