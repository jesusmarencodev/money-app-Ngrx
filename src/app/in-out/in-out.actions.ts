import { createAction, props } from '@ngrx/store';
import { IncomeExpenses } from '../model/incomeExpenses.model';

export const setItems = createAction(
  '[In-out Component] Set Items',
  props<{ items: IncomeExpenses[] }>()
);

export const unSetItems = createAction('[In-out Component] Un SetItems');
