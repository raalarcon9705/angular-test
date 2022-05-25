import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxRole, NgxRolesService } from 'ngx-permissions';
import { map, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private _jwtService: JwtService, private _rolesService: NgxRolesService) {
  }

  addRoles() {
    this._rolesService.addRoles({
      GUEST: () => {
        return firstValueFrom(this._jwtService.jwt$.pipe(map(jwt => !jwt)));
      },
      USER: () => {
        return firstValueFrom(this._jwtService.jwt$.pipe(map(jwt => !!jwt)));
      },
      ADMIN: () => {
        return firstValueFrom(
          this._jwtService.user$.pipe(map(user => {
            if (!user) {
              return false;
            }
            return user.roles?.includes('admin');
          }))
        )
      }
    });
  }
}
