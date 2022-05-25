import { SortDirection } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interfaces';

export const loadUsers = createAction(
  '[Users] Load Users',
  props<{
    page: number;
    limit: number;
    sort: string;
    sortOrder: SortDirection | undefined;
  }>()
);

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: any }>()
);

export const addUser = createAction(
  '[Users] Add User',
  props<{ user: User }>()
);
