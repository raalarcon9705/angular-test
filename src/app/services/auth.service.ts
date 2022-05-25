import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignInSuccessPayload, SignUpPayload } from '../interfaces';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private _jwtService: JwtService, private _http: HttpClient) { }

  signIn(email: string, password: string) {
    return this._http.post<SignInSuccessPayload>(`${environment.apis.apiServer}/signin`, { email, password })
      .pipe(
        map(data => {
          this._jwtService.setJwt(data.accessToken, data.user);
          return data;
        })
      )
  }

  signUp(user: any) {
    const data = {
      ...user,
      roles: ['user']
    };
    return this._http.post(`${environment.apis.apiServer}/signup`, data);
  }

  signOut() {
    return of(true)
      .pipe(
        map(data => {
          this._jwtService.clearJwt();
          return data;
        })
      );
  }
}
