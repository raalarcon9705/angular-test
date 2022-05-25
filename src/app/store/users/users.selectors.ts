import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';

export const selectUsersState = createFeatureSelector<fromUsers.State>(
  fromUsers.usersFeatureKey
);

export const {
  selectAll: selectAllUsers,
  selectEntities: selectUsersEntities,
} = fromUsers.adapter.getSelectors(selectUsersState);

export const selectUsersPage = createSelector(selectUsersState, (state) =>
  state.foundPage.map((id) => state.entities[id]!)
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state) => state.loading
);
