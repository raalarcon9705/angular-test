import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { NgxPermissionsModule } from "ngx-permissions";
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { RolesService } from "../services/roles.service";
import { JwtInterceptor } from "../interceptors/jwt.interceptor";

@NgModule({
  imports: [
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    MatSnackBarModule
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
  ]
})
export class CoreModule {
  constructor(rolesService: RolesService) {
    rolesService.addRoles();
  }
}
