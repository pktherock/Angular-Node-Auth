import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css'],
})
export class ChangeEmailComponent {
  token!: string;
  userId!: string;
  loading: boolean = true;
  emailChanged: boolean = false;

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
      const response = await this.authService.changeEmail(
        this.token,
        this.userId
      );
      this.loading = false;
      if (typeof response === 'object') {
        this.alertService.success('new email updated successfully.');
        this.emailChanged = true;
      }
    }
    //  if correct then show ui to verify
  }
}
