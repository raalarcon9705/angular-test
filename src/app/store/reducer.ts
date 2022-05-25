import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromAuth from './auth';
import * as fromUsers from './users';


export interface State {
  auth: fromAuth.State;
  users: fromUsers.State
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  users: fromUsers.reducer
};

export const metaReducers: MetaReducer<State>[] = [];
