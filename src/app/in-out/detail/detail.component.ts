import { Component, OnDestroy, OnInit } from '@angular/core';
import { IncomeExpensesService } from '../../services/income-expenses.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { IncomeExpenses } from 'src/app/model/incomeExpenses.model';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit, OnDestroy {
  items: IncomeExpenses[] = [];
  itemsSubs: Subscription;

  constructor(
    // private fb: FormBuilder,
    private incomeExpensesService: IncomeExpensesService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.itemsSubs = this.store
      .select('inOut')
      .subscribe(({ items }) => (this.items = items));
  }

  ngOnDestroy(): void {
    this.itemsSubs.unsubscribe();
  }

  delete(uid: string) {
    this.incomeExpensesService.delete(uid)
    .then(()=>Swal.fire('Delete', 'ok', 'success'))
    .catch((err)=> Swal.fire('Error', err.message, 'error'))
  }
}
