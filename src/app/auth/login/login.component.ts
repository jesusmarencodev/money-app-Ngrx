import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { AuthService } from '../../services/auth.service';
import { isLoading } from 'src/app/shared/ui.actions';
import { stopLoading } from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  charging: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['j@j.com', [Validators.required, Validators.email]],
      password: ['1234567', Validators.required],
    });

    this.uiSubscription = this.store
      .select('ui')
      .subscribe((ui) => (this.charging = ui.isLoading));
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  login() {
    if (this.formGroup.invalid) return;

    this.store.dispatch(isLoading());

    // Swal.fire({
    //   title: 'Wait please',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const { email, password } = this.formGroup.value;
    this.authService
      .loginUser(email, password)
      .then((credentials) => {
        //Swal.close();
        this.store.dispatch(stopLoading());
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.store.dispatch(stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }
}
