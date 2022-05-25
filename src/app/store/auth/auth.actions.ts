import { createAction, props } from '@ngrx/store';
import { SignInPayload, SignInSuccessPayload, FailurePayload, SignUpPayload } from 'src/app/interfaces';

export const signIn = createAction('[Auth] Sign In', props<SignInPayload>());

export const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<SignInSuccessPayload>()
);

export const signInFailure = createAction(
  '[Auth] Sign In Failure',
  props<FailurePayload>()
);


export const signUp = createAction('[Auth] Sign Up', props<SignUpPayload>());
export const signUpSuccess = createAction('[Auth] Sign Up Success');
export const signUpFailure = createAction('[Auth] Sign Up Failure', props<FailurePayload>());

export const signOut = createAction('[Auth] Sign Out');
export const signOutSuccess = createAction('[Auth] Sign Out Success');
export const signOutFailure = createAction('[Auth] Sign Out Failure', props<FailurePayload>());
