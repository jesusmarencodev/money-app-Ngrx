import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit,  OnDestroy {
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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store
    .select('ui')
    .subscribe((ui) => (this.charging = ui.isLoading));
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  createUser() {
    if (this.formGroup.invalid) return;
    this.store.dispatch(isLoading());
    // Swal.fire({
    //   title: 'Wait please',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    const { name, email, password } = this.formGroup.value;
    this.authService
      .createUser(name, email, password)
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
