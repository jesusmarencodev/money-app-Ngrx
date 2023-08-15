import { createReducer, on } from '@ngrx/store';
import { User } from '../model/user.model';
import * as actions from './auth.actions';

export interface State {
  user: User;
}

export const initialState: State = {
  user: null,
};

const _authReducer = createReducer(
  initialState,

  on(actions.setUser, (state, { user }) => ({ ...state, user: { ...user } })),
  on(actions.unSetUser, (state) => ({ ...state, user: null }))
);

export function authReducer(state, action) {
  return _authReducer(state, action);
}
