import { createReducer, on } from '@ngrx/store';
import { IncomeExpenses } from '../model/incomeExpenses.model';
import { setItems, unSetItems } from './in-out.actions';

export interface State {
  items: IncomeExpenses[];
}

export const initialState: State = {
  items: [],
};

const _inOutReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unSetItems, (state) => ({ ...state, items: [] }))
);

export function inOutReducer(state, action) {
  return _inOutReducer(state, action);
}
