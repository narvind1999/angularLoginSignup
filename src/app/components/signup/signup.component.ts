import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMisMatchValidator } from '../../shared/password-match.directive';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/auth';
import { MessageService } from 'primeng/api';
import { Route, Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  registerForm = this.fb.group(
    {
      fullName: ['', [Validators.required, Validators.pattern('[A-Za-z]{3}')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: passwordMisMatchValidator, // Applied at form level
    }
  );

  submitDetails() {
    const postData = this.registerForm.value;
    delete postData.confirmPassword;
    this.authService.userRegister(postData as User).subscribe(
      (response) => {
        
        
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registration Successful',
        });
        timeout(2000)
        this.router.navigate(['login'])
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'something went wrong',
        });
      }
    );
  }



  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }
}
