import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { AuthService } from 'src/app/services';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthEffects {
  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signIn),
      concatMap(({ email, password }) =>
        this._authService.signIn(email, password).pipe(
          map((data) => AuthActions.signInSuccess(data)),
          catchError((error) => of(AuthActions.signInFailure({ error })))
        )
      )
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signUp),
      concatMap(({ user }) =>
        this._authService.signUp(user).pipe(
          map((data) => AuthActions.signUpSuccess()),
          catchError((error) => of(AuthActions.signUpFailure({ error })))
        )
      )
    );
  });

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOut),
      concatMap(() =>
        this._authService.signOut().pipe(
          map(() => AuthActions.signOutSuccess()),
          catchError(error => of(AuthActions.signOutFailure({ error }))))
        ),
    );
  });


  /** NO DISPATCH EFFECTS */

  signInSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        tap(() => this._router.navigateByUrl('/'))
      );
    },
    { dispatch: false }
  );

  signUpSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signUpSuccess),
        tap(() => this._router.navigateByUrl('/auth'))
      );
    },
    { dispatch: false }
  );

  signOutSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOutSuccess),
      tap(() => this._router.navigateByUrl('/auth')));
  }, { dispatch: false });

  authFailures$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signUpFailure, AuthActions.signInFailure),
      tap(({error}) => {
        const message = error.error || 'Failed';
        this._snackBar.open(message, '', { duration: 3000 })
      }));
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}
}
