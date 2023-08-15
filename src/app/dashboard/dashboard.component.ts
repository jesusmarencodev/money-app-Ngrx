import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IncomeExpensesService } from '../services/income-expenses.service';
import { setItems } from '../in-out/in-out.actions';
import { IncomeExpenses } from '../model/incomeExpenses.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs: Subscription;
  inOutSubs: Subscription;
  constructor(
    private store: Store<AppState>,
    private incomeExpensesService: IncomeExpensesService
  ) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('user')
      .pipe(filter((auth) => auth.user != null))
      .subscribe(({ user }) => {
        this.inOutSubs = this.incomeExpensesService.observerInOut(user.uid).subscribe((res) => {
          this.store.dispatch(setItems({ items: res as IncomeExpenses[] }));
        });
      });
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
    this.inOutSubs.unsubscribe();
  }
}
