import {
  AfterViewInit,
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { merge, Subscription } from 'rxjs';
import { User } from 'src/app/interfaces';
import { UsersStoreService } from 'src/app/store/users';
import { UsersDataSource } from './users-datasource';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable, { static: true }) table!: MatTable<User>;
  dataSource: UsersDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'fullName', 'email', 'options'];

  private _subscriptions = new Subscription();

  constructor(_usersService: UsersStoreService) {
    this.dataSource = new UsersDataSource(_usersService);
  }

  ngOnInit(): void {
    this.dataSource.loadUsersPage();
    this._subscriptions.add(
      merge(this.paginator.page, this.sort.sortChange).subscribe(() =>
        this.dataSource.loadUsersPage()
      )
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
