import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './auth/login/login.module';
import { RegisterModule } from './auth/register/register.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { FilterComponent } from './vehicles/filter/filter.component';
import { VehiclesListComponent } from './vehicles/vehicles-list/vehicles-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionsDirective } from './directives/permissions.directive';
import { MatButtonModule } from '@angular/material/button';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MaintananceComponent } from './maintanance/maintanance.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SalesOverTimeComponent } from './analytics/sales-over-time/sales-over-time.component';
import { ChartModule } from 'angular-highcharts';
import { CustomerRatingDistributionComponent } from './analytics/customer-rating-distribution/customer-rating-distribution.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    AppComponent,
    VehiclesComponent,
    FilterComponent,
    VehiclesListComponent,
    AnalyticsComponent,
    MaintananceComponent,
    SalesOverTimeComponent,
    CustomerRatingDistributionComponent,
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegisterModule,
    LoginModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    PermissionsDirective,
    MatTableModule,
    MatPaginatorModule,
    ChartModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatTabsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
