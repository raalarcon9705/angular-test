import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./routes/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['GUEST'],
        redirectTo: '/'
      }
    }
  },
  {
    path: '',
    loadChildren: () =>
      import('./routes/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        except: ['GUEST'],
        redirectTo: '/auth'
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
