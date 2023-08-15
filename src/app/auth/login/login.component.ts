import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  charging: boolean = false;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.store.select('ui').subscribe((ui) => (this.charging = ui.isLoading));
  }

  login() {
    if (this.formGroup.invalid) return;

    Swal.fire({
      title: 'Wait please',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const { email, password } = this.formGroup.value;
    this.authService
      .loginUser(email, password)
      .then((credentials) => {
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }
}
