import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpenses } from '../model/incomeExpenses.model';

@Pipe({
  name: 'orderInOut'
})
export class OrderInOutPipe implements PipeTransform {

  transform(items: IncomeExpenses[]): IncomeExpenses[] {

    return items.sort((a, b)=> {
      if(a.type==='income'){
        return -1
      }else{
        return 1
      }
    })
  }

}
