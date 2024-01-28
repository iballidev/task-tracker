import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends DataService {
  constructor(private router: Router, http: HttpClient, injector: Injector) {
    super(environment.baseUrl, http, injector);
  }
}

export interface SignUpUser {
  email: String;
  password: String;
  confirm_password: String;
}
