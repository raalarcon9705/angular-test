import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/interfaces';
import * as UsersActions from './users.actions';

export const usersFeatureKey = 'users';

export interface State extends EntityState<User> {
  loading?: boolean;
  foundPage: string[];
}

export const adapter = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  foundPage: [],
});

export const reducer = createReducer(
  initialState,

  on(UsersActions.loadUsers, (state) => ({ ...state, loading: true })),
  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    adapter.addMany(users, {
      ...state,
      loading: false,
      foundPage: users.map((u) => u.id),
    })
  ),
  on(UsersActions.loadUsersFailure, (state, action) => ({
    ...state,
    loading: false,
  })),

  on(UsersActions.addUser, (state, { user }) => adapter.addOne(user, state))
);
