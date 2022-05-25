import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UsersSelectors from './users.selectors';
import * as UsersActions from './users.actions';
import { SortDirection } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class UsersStoreService {
  users$ = this._store.select(UsersSelectors.selectAllUsers);
  currentPageData$ = this._store.select(UsersSelectors.selectUsersPage);
  loading$ = this._store.select(UsersSelectors.selectUsersLoading);

  constructor(private _store: Store) { }

  loadUsers(page = 1, limit = 20, sort = '', sortOrder: SortDirection | undefined) {
    this._store.dispatch(UsersActions.loadUsers({ page, limit, sort, sortOrder }));
  }
}
