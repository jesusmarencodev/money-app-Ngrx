import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IncomeExpenses } from '../model/incomeExpenses.model';
import { AuthService } from './auth.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncomeExpensesService {
  constructor(
    private fireStore: AngularFirestore,
    private authService: AuthService,
    
  ) {}

  async create(incomeExpenses: IncomeExpenses): Promise<void> {
    return this.fireStore
      .doc(`${this.authService.user.uid}/income-expenses`)
      .collection('items')
      .add({ ...incomeExpenses })
      .then((resp) => console.log('Done ', resp))
      .catch((err) => console.warn(err));
  }

  observerInOut(uid: string): Observable<IncomeExpenses[] | unknown[]> {
    return this.fireStore
      .collection(`${uid}/income-expenses/items`)
      .valueChanges({
        uid: 'uid',
        description: 'description',
        amount: 'amount',
        type: 'type',
      });
  }

  delete(uid: string) {
    return this.fireStore.doc(
      `${this.authService.user.uid}/income-expenses/items/${uid}`
    ).delete();
  }
}
