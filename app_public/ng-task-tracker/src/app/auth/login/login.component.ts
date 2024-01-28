import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginUser } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppError } from '../../common/app-error';
import { BadInputError } from '../../common/bad-input-error';
import { ToastrService } from 'ngx-toastr';
import { ConflictError } from '../../common/conflict-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  responseMessage: any = {
    message: '',
    type: '',
  };
  constructor(
    private fb: FormBuilder,
    private _authSvc: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(loginForm: FormGroup) {
    console.log(loginForm.value);

    if (loginForm.valid) {
      const data: LoginUser = {
        email: loginForm.value.email,
        password: loginForm.value.password,
      };
      console.log('data: ', data);
      this._authSvc.login_user(data).subscribe({
        next: (response: any) => {
          if (response) {
            this.toastr.success("You are logged in");
            this.router.navigate(['/tasks']);
          }
        },
        error: (err: AppError) => {
          for (const key in this.responseMessage) {
            if (
              Object.prototype.hasOwnProperty.call(this.responseMessage, key)
            ) {
              let element = this.responseMessage[key];
              element = null;
            }
          }

          // let someObj = {
          //   name: 'alli',
          //   age: 40,
          // };
          // let resetObject = new ResetObjectValues(someObj);

          // console.log('resetObject: ', resetObject.reset());
          if (err instanceof ConflictError) {
            this.loginForm.setErrors(err.originalError);
            this.responseMessage.message =
              loginForm['errors']?.['error']?.['message'];
            this.responseMessage.type = err;
          }
          if (err instanceof BadInputError) {
            this.loginForm.setErrors(err.originalError); // append error to form
          } else {
            throw err;
          }
        },
      });
    }
  }
}
