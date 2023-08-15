import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { incomeExpensesType } from '../model/incomeExpenses.model';
import { IncomeExpensesService } from '../services/income-expenses.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-in-out',
  templateUrl: './in-out.component.html',
})
export class InOutComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  type: incomeExpensesType = 'income';
  charging: boolean = false;
  loadingSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private incomeExpensesService: IncomeExpensesService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loadingSubs = this.store
      .select('ui')
      .subscribe(({ isLoading }) => (this.charging = isLoading));

    this.formGroup = this.fb.group({
      description: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
    });
  }
  ngOnDestroy(): void {
    this.loadingSubs?.unsubscribe();
  }

  save() {
    if (this.formGroup.invalid) return;
    this.store.dispatch(isLoading());
    const { description, amount } = this.formGroup.value;
    this.incomeExpensesService
      .create({ description, amount, type: this.type })
      .then(() => {
        this.store.dispatch(stopLoading());
        Swal.fire('Field Created', `${description}`, 'success');
      })
      .catch((err) => {
        this.store.dispatch(stopLoading());
        Swal.fire('Error', `${err.message}`, 'error');
      });
  }
}
