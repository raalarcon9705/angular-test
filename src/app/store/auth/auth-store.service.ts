import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SignUpPayload } from 'src/app/interfaces';

import * as authActions from './auth.actions';
import * as authSelectors from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  state$ = this._store.select(authSelectors.selectAuthState);

  constructor(private _store: Store) {}

  signIn(email: string, password: string) {
    this._store.dispatch(authActions.signIn({ email, password }));
  }

  signUp(data: SignUpPayload) {
    this._store.dispatch(authActions.signUp(data))
  }

  signOut() {
    this._store.dispatch(authActions.signOut());
  }
}
