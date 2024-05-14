import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required]]
  })

  get email(){
    return this.loginForm.controls['email'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }
  
  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router,private messageService: MessageService ){
  }

  loginSubmit(){
    const {email,password} = this.loginForm.value

    this.authService.getUserByEmail(email as string).subscribe(
      response =>{
        if(response.length>0 && response[0].password === password){
          sessionStorage.setItem('email', email as string)
          this.router.navigate(['home'])
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login Successful',
          });
        }else{
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Username or password is wrong',
          });

        }
      },error=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
        });
      }
    )

  }

}
