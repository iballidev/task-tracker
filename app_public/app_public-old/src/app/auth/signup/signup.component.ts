import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, SignUpUser } from '../../services/auth.service';
import { AppError } from '../../common/app-error';
import { BadInputError } from '../../common/bad-input-error';
// import { ToastrService } from 'ngx-toastr';

function passwordMatchValidator(form: any) {
  const password = form.get('password').value;
  const confirm_password = form.get('confirm_password').value;
  return password === confirm_password ? null : { passwordMismatch: true };
}
@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm!: FormGroup;
  responseMessage: any = {
    message: '',
    type: '',
  };

  constructor(
    private fb: FormBuilder,
    private _authSvc: AuthService,
    // private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.signupForm = this.fb.group(
      {
        email: [
          'iballi2017@gmsil.com',
          [Validators.required, Validators.email],
        ],
        password: ['a', Validators.required],
        confirm_password: ['a', Validators.required],
      },
      {
        // validators: [passwordMatchValidator, termsCheckValidator],
        validators: [passwordMatchValidator],
      }
    );
  }

  onSubmit(signupForm: FormGroup) {
    console.log('data: ', signupForm.value);
    if (signupForm.valid) {
      const data: SignUpUser = {
        email: signupForm.value.email,
        password: signupForm.value.password,
        confirm_password: signupForm.value.confirm_password,
      };
      console.log('data: ', data);
      this._authSvc.create(data, 'signup').subscribe({
        next: (response: any) => {
          if (response) {
            // this.toastr.success(response?.message);
            this.router.navigate(['/auth']);
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
          // if (err instanceof ConflictError) {
          //   this.signupForm.setErrors(err.originalError);
          //   this.responseMessage.message =
          //     signupForm['errors']?.['error']?.['message'];
          //   this.responseMessage.type = ApiResponseType.error;
          // }
          if (err instanceof BadInputError) {
            this.signupForm.setErrors(err.originalError); // append error to form
          } else {
            throw err;
          }
        },
      });
    }
  }
}
