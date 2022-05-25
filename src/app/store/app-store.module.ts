import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { AuthStoreModule } from './auth/auth-store.module';
import { reducers, metaReducers } from './reducer';
import { UsersStoreModule } from './users';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    AuthStoreModule,
    UsersStoreModule
  ]
})
export class AppStoreModule {}
