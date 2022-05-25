import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces';
import * as fromUsers from '../store/users';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  jwt$ = new BehaviorSubject<string | null>(null);
  user$ = new BehaviorSubject<User | null>(null);

  constructor(private _cookies: CookieService, private _store: Store) {
    this._loadCookies();
  }

  setJwt(jwt: string, user: User) {
    this._cookies.set(environment.cookies.jwt, jwt);
    this._cookies.set(environment.cookies.user, JSON.stringify(user));

    this.jwt$.next(jwt);
    this.user$.next(user);
  }

  clearJwt() {
    this._cookies.delete(environment.cookies.jwt);
    this._cookies.delete(environment.cookies.user);

    this.jwt$.next(null);
    this.user$.next(null);
  }

  private _loadCookies() {
    const jwt = this._cookies.get(environment.cookies.jwt);
    const userCookie = this._cookies.get(environment.cookies.user);

    if (jwt && userCookie) {
      this.jwt$.next(jwt);
      const user = JSON.parse(userCookie);
      this.user$.next(user);
      this._store.dispatch(fromUsers.addUser({ user }));
    }
  }
}
