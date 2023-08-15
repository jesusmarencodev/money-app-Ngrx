import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IncomeExpenses } from 'src/app/model/incomeExpenses.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent implements OnInit {

  in:number=0;
  out:number=0;

  totalIn:number=0;
  totalOut:number=0;
  itemsSubs: Subscription;



  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.itemsSubs = this.store
    .select('inOut')
    .subscribe(({ items }) => this.generateStatistics(items));
  }

  generateStatistics(items:IncomeExpenses[]){
    for (const item of items) {
      if(item.type==='income'){
        this.totalIn  += item.amount;
        this.in++
      }else{
        this.totalOut  += item.amount;
        this.out++
      }
    }
  }

}
