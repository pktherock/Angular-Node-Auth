import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userEmail!: string;
  constructor(private authService: AuthService, private router: Router) {
    const userInfo = this.authService.userInfo?.userInfo;
    if (userInfo) {
      this.userEmail = userInfo?.email;
    }
  }

  ngOnInit(): void {}

  onLogOutBtnClick() {
    this.authService.logOut();
  }
}
