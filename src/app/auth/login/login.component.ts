import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private readonly authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if(this.formGroup.invalid) return;
    const {email, password} = this.formGroup.value;
    this.authService.loginUser( email, password)
      .then(credentials =>{
        this.router.navigate(['/']);
      })
      .catch(err =>{
        console.log(err)
      })
  }

}
