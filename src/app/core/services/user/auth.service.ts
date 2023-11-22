import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { Router } from '@angular/router';

import ApiResponse from 'src/app/utils/ApiResponse';

type User = {
  accessToken?: string;
  refreshToken?: string;
  userInfo: {
    userName: string;
    email: string;
    gender?: string;
    avatar?: {
      url: string;
      localPath: string;
    };
    lastLoggedInAt: string;
    role: string;
    passwordUpdatedAt?: string;
    disable: string;
    verified: string;
    phoneNumber?: string;
    dateOfBirth?: string;
  };
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo: User | null;
  // todo observable

  constructor(private router: Router, private http: HttpClient) {
    this.userInfo = null;
  }

  setUserOnUnauthorizedAccess() {
    this.userInfo = null;
  }

  // this function will run before application starts and ready to use
  Init() {
    return new Promise<void>(async (resolve, reject) => {
      // api call to get user info
      const userInfo = await this.getLoggedInfo();
      if (typeof userInfo === 'object') {
        this.userInfo = userInfo;
      }
      resolve();
    });
  }

  async getLoggedInfo() {
    try {
      const response = await lastValueFrom(
        this.http.get<ApiResponse>('/api/v1/auth/validate-session')
      );
      // console.log(response);
      return response.data as User;
    } catch (error: any) {
      console.log('HTTP Error:', error);
      return error.message as string;
    }
  }

  get isUserLoggedIn() {
    return this.userInfo !== null; // todo
  }

  // Function to signup with email and password
  async signUp(userName: string, email: string, password: string) {
    try {
      const response = await lastValueFrom(
        this.http.post<ApiResponse>('/api/v1/auth/register', {
          userName,
          email,
          password,
        })
      );
      // console.log(response);
      return response.data;
    } catch (error: any) {
      console.log('HTTP Error:', error);
      return error.message;
    }
  }

  async getUserVerificationStatus(userId: string) {
    try {
      const response = await lastValueFrom(
        this.http.get<ApiResponse>(`/api/v1/auth/verify-user/${userId}`)
      );
      // console.log(response);
      return response.data as { isVerified: boolean };
    } catch (error: any) {
      console.log('HTTP Error:', error);
      return error.message as string;
    }
  }

  // Function to login with email and password
  async logInWithEmailAndPassword(email: string, password: string) {
    try {
      const response = await lastValueFrom(
        this.http.post<ApiResponse>('/api/v1/auth/login', {
          email,
          password,
        })
      );
      this.userInfo = response.data as User;
      return response;
    } catch (error: any) {
      console.log('HTTP Error:', error);
      return error.message as string;
    }
  }

  async verifyAccount(token: string, userId: string) {
    try {
      const response = await lastValueFrom(
        this.http.post<ApiResponse>(`/api/v1/auth/verify-user/${userId}`, {
          token,
        })
      );
      // console.log(response);
      return response.data as User;
    } catch (error: any) {
      console.log('HTTP Error:', error);
      return error.message as string;
    }
  }

  // * This function will send verification link to the new email id if clicked and verified the automatically email will update
  async verifyAndUpdateEmail(newEmail: string) {
    try {
      const response = await lastValueFrom(
        this.http.post<ApiResponse>('/api/v1/auth/change-email-request', {
          email: newEmail,
        })
      );
      // console.log(response);
      return response.data;
    } catch (error: any) {
      console.log('HTTP Error:', error);
      return error.message as string;
    }
  }

  async changeEmail(token: string, userId: string) {
    try {
      const response = await lastValueFrom(
        this.http.post<ApiResponse>('/api/v1/auth/change-email', {
          token,
          userId,
        })
      );
      // console.log(response);
      this.userInfo = null;
      return response.data;
    } catch (error: any) {
      console.log('HTTP Error:', error);
      return error.message as string;
    }
  }

  async updatePassword(password: string, newPassword: string) {
    try {
      const response = await lastValueFrom(
        this.http.post<ApiResponse>('/api/v1/auth/change-password', {
          password,
          newPassword,
        })
      );
      // console.log(response);
      return response.data;
    } catch (error: any) {
      console.log('HTTP Error:', error);
      return error.message as string;
    }
  }

  async sendResetPasswordLinkToEmail(email: string) {
    try {
      const response = await lastValueFrom(
        this.http.post<ApiResponse>('/api/v1/auth/request-reset-password', {
          email,
        })
      );
      // console.log(response);

      return response.success;
    } catch (error: any) {
      console.log('HTTP Error:', error);
      return error.message as string;
    }
  }

  async getTokenValidity(token: string, userId: string) {
    try {
      const response = await lastValueFrom(
        this.http.get<ApiResponse>(
          `/api/v1/auth/token-validate?token=${token}&userId=${userId}`
        )
      );
      // console.log(response);
      return response.data;
    } catch (error: any) {
      console.log('HTTP Error:', error);
      return error.message as string;
    }
  }

  async setPassword(
    token: string,
    userId: string,
    otp: string,
    password: string
  ) {
    try {
      const response = await lastValueFrom(
        this.http.post<ApiResponse>('/api/v1/auth/reset-password', {
          token,
          userId,
          otp,
          password,
        })
      );
      // console.log(response);
      return response.data as null;
    } catch (error: any) {
      console.log('HTTP Error:', error);
      return error.message as string;
    }
  }

  async deleteUserFromDB(currentPassword: string) {
    try {
      const response = await lastValueFrom(
        this.http.delete<ApiResponse>('/api/v1/auth/delete-user', {
          body: { password: currentPassword },
        })
      );
      this.userInfo = null;
      // console.log(response);
      return response.data;
    } catch (error: any) {
      console.log('HTTP Error:', error);
      return error.message as string;
    }
  }

  async logOut() {
    try {
      const response = await lastValueFrom(
        this.http.post<ApiResponse>('/api/v1/auth/logout', {}) // todo without body send post request
      );
      this.userInfo = null;
      // console.log(response);
      return response;
    } catch (error: any) {
      console.log('HTTP Error:', error);
      return error.message as string;
    }
  }
}
