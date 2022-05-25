import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/interfaces';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  loading?: boolean;
  jwt?: string;
  user?: User;
}

export const initialState: State = {};

export const reducer = createReducer(
  initialState,

  on(AuthActions.signIn, (state) => ({ ...state, loading: true })),
  on(AuthActions.signInSuccess, (state, { accessToken, user }) => ({
    ...state,
    loading: false,
    user,
    jwt: accessToken,
  })),
  on(AuthActions.signInFailure, (state, action) => ({
    ...state,
    loading: false,
  }))
);
