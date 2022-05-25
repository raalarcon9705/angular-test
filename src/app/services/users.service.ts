import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly baseUrl = `${environment.apis.apiServer}/users`;

  constructor(private _http: HttpClient) { }

  getUsers(_page: number, _limit: number, _sort?: string, _order?: string) {
    const params = { _page, _limit, _sort, _order } as any;
    return this._http.get<User[]>(this.baseUrl, { params });
  }
}
