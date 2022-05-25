import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as UsersActions from './users.actions';
import * as AuthActions from '../auth/auth.actions';
import { UsersService } from 'src/app/services/users.service';



@Injectable()
export class UsersEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsersActions.loadUsers),
      concatMap(({ page, limit, sort, sortOrder }) =>
        this._usersService.getUsers(page, limit, sort, sortOrder).pipe(
          map(users => UsersActions.loadUsersSuccess({ users })),
          catchError(error => of(UsersActions.loadUsersFailure({ error }))))
      )
    );
  });

  /** FROM EXTERNALS ACTIONS */

  signInSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInSuccess),
      map(({ user }) => UsersActions.addUser({ user })));
  });


  constructor(private actions$: Actions, private _usersService: UsersService) {}

}
