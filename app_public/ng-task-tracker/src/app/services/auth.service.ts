import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DataService } from './data.service';
import * as jwt_decode from 'jwt-decode';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends DataService {
  // constructor(private router: Router, http: HttpClient, injector: Injector) {
  //   super(environment.baseUrl, http, injector);
  // }
  constructor(private router: Router, http: HttpClient, injector: Injector) {
    super(environment.baseUrl, http, injector);
  }

  login_user(payload: LoginUser) {
    return this.create(payload, 'auth').pipe(
      map((response: any) => {
        console.log('set_token_and_roles****login_user*****', response);
        if (response && response.accessToken) {
          this.set_token_and_roles(response.accessToken, response.roles);
          this.isAuthenticated();
          return true;
        }
        return false;
      })
    );
  }

  set_token_and_roles(accessToken: any, roles: any) {
    console.log('set_token_and_roles*********');
    // localStorage.setItem('token', accessToken);
    // localStorage.setItem('roles', roles);

    // if (typeof localStorage !== 'undefined') {
    //   localStorage.setItem('token', accessToken);
    //   localStorage.setItem('roles', roles);
    // }

    // // else if (typeof sessionStorage !== 'undefined') {
    // //   // Fallback to sessionStorage if localStorage is not supported
    // //   sessionStorage.setItem('key', 'value');
    // // }
    // else {
    //   // If neither localStorage nor sessionStorage is supported
    //   console.log('Web Storage is not supported in this environment.');
    // }
  }

  logout_user() {
    console.log('log out!');
    this.logout().subscribe((response) => {
      if (response) {
        // if (typeof localStorage !== 'undefined') {
        //   localStorage.clear();
        // } else {
        //   console.log('Web Storage is not supported in this environment.');
        // }
        this.router.navigate(['/']);
      }
    });
  }

  isAuthenticated(): boolean {
    // Implement your authentication logic here
    // For example, check if the user is logged in
    // const token = this.accessToken;
    // console.log('token: ', token);

    try {
      const token: any = this.accessToken;
      // console.log('token: ', token);
      if (token) {
        const decodedToken = jwt_decode.jwtDecode(token);
        const expiryDate: any = decodedToken.exp;

        if (decodedToken) {
          // console.log('Decoded Token:', decodedToken);
          // Assuming the provided date is a Unix timestamp
          const timestamp = expiryDate;

          // Convert the timestamp to milliseconds (JavaScript uses milliseconds for dates)
          const expirationDate = new Date(timestamp * 1000);

          // Get the current date
          const currentDate = new Date();

          // Compare the current date with the expiration date
          if (currentDate > expirationDate) {
            // console.log('The date has expired.');
            return false;
          } else {
            // console.log('The date is still valid.');
            return true;
          }
          // Access the decoded information as needed
        } else {
          // console.error('Failed to decode token');
          return false;
        }
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }

    return false; // Replace with your actual authentication check
  }

  get accessToken() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : null;
  }

  get currentUser() {
    if (this.isAuthenticated()) {
      const token: any = this.accessToken;
      const decodedToken: any = jwt_decode.jwtDecode(token);
      // console.log('decodedToken.UserInfo: ', decodedToken.UserInfo);
      return decodedToken.UserInfo;
    }
    return null;
  }

  refresh_token() {
    return this.get_data('refresh-token').pipe(
      map((response: any) => {
        if (response && response.accessToken) {
          this.set_token_and_roles(response.accessToken, response.roles);
          return true;
        }
        return false;
      })
    );
  }
}

export interface SignUpUser {
  email: String;
  password: String;
  confirm_password: String;
}
export interface LoginUser {
  email: String;
  password: String;
}
