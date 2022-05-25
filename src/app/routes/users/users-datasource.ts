import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces';
import { UsersStoreService } from 'src/app/store/users';

/**
 * Data source for the Users view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UsersDataSource extends DataSource<User> {
  data$ = this._usersService.currentPageData$;
  loading$ = this._usersService.loading$;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  get length$() {
    return this.data$.pipe(map((data) => data.length));
  }

  constructor(private _usersService: UsersStoreService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<User[]> {
    return this.data$;
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  loadUsersPage() {
    this._usersService.loadUsers(
      this.paginator?.pageIndex,
      this.paginator?.pageSize,
      this.sort?.active,
      this.sort?.direction
    );
  }
}
