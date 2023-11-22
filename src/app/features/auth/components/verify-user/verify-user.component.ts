import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css'],
})
export class VerifyUserComponent {
  token!: string;
  userId!: string;
  isVerified!: boolean;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.token = this.route.snapshot.queryParams['token'];
    this.userId = this.route.snapshot.queryParams['userId'];

    if (!(this.token && this.userId)) {
      this.alertService.error(
        'token and useId is required to access this page'
      );
      this.router.navigate(['auth/login']);
    }
  }

  async ngOnInit() {
    // call api to check token and userId is valid or not
    if (this.userId && this.token) {
      const response = await this.authService.getUserVerificationStatus(
        this.userId
      );
      this.loading = false;
      if (typeof response === 'object') {
        if (response.isVerified) {
          this.isVerified = true;
        }
      }
    }
    //  if correct then show ui to verify
  }

  async onVerifyAccountBtnClick() {
    const response = await this.authService.verifyAccount(
      this.token,
      this.userId
    );
    if (typeof response === 'object') {
      if (response.userInfo.verified) {
        this.alertService.success('Account verified successfully');
        this.router.navigate(['/auth/login']);
      }
    }
  }
}
