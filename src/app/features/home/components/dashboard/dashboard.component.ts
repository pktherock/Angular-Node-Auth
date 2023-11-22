import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userEmail!: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    const userInfo = this.authService.userInfo?.userInfo;
    if (userInfo) {
      this.userEmail = userInfo?.email;
    }
  }

  ngOnInit(): void {}

  async onLogOutBtnClick() {
    const response = await this.authService.logOut();
    if (typeof response === 'object') {
      this.router.navigate(['']);
      this.alertService.success('Logged Out successfully.');
    }
  }
}
