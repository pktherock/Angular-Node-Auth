import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, firstValueFrom } from 'rxjs';

import { Router } from '@angular/router';

import ApiResponse from 'src/app/utils/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUserId!: string;
  userEmailId!: string;

  constructor(private router: Router, private http: HttpClient) {}

  // this function will run before application starts and ready to use
  Init() {
    return new Promise<void>((resolve) => {
      resolve(); // todo
    });
  }

  get isUserLoggedIn() {
    return false; // todo
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
      return response
    } catch (error: any) {
        console.log('HTTP Error:', error);
        return error.message;
    }
  }

  // Function to login with email and password
  async logInWithEmailAndPassword(email: string, password: string) {
    console.log('Email', email);
    console.log('Password', password);
    try {
      // todo
      return { success: true };
    } catch (err: any) {
      //todo auth/user-not-found
      console.log(err.code);
      return { success: false, error: err.code };
    }
  }

  private async reAuthenticate(currentPassword: string) {
    // todo
  }

  // * This function will send verification link to the new email id if clicked and verified the automatically email will update
  async verifyAndUpdateEmail(
    newEmail: string,
    currentPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      //  todo
      return { success: true };
    } catch (error: any) {
      console.log(error);
      return { success: false, error: error.code };
    }
  }

  // * This function will update email immediately
  async updateEmail(
    newEmail: string,
    currentPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await this.reAuthenticate(currentPassword);
      //  todo
      return { success: true };
    } catch (error: any) {
      console.log(error);
      return { success: false, error: error.code };
    }
  }

  async updatePassword(
    currentPassword: string,
    updatedPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await this.reAuthenticate(currentPassword);
      //  todo
      return { success: true };
    } catch (error: any) {
      console.log(error);
      return { success: false, error: error.code };
    }
  }

  async sendResetPasswordLinkToEmail(
    email: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      //  todo
      return { success: true };
    } catch (error: any) {
      console.log(error);
      return { success: false, error: error.code };
    }
  }

  async deleteUserFromDB(
    currentPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await this.reAuthenticate(currentPassword);
      // todo
      return { success: true };
    } catch (error: any) {
      console.log(error);
      return { success: false, error: error.code };
    }
  }

  async logOut() {
    // todo
    this.loggedInUserId = '';
    this.router.navigate(['']);
  }
}
