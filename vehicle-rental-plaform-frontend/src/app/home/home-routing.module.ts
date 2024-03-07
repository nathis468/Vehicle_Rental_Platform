import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent,children:[
    { path: '', loadChildren: () => import('../vehicles/vehicles.module').then(m => m.VehiclesModule)},
    { path: 'vehicles', loadChildren: () => import('../vehicles/vehicles.module').then(m => m.VehiclesModule)},
    { path: 'add-vehicle', loadChildren: () => import('../add-vehicle/add-vehicle.module').then(m => m.AddVehicleModule), canActivate: [AuthGuard]},
    { path: 'booking-details', loadChildren: () => import('../booking-details/booking-details.module').then(m => m.BookingDetailsModule), canActivate: [AuthGuard]},
    { path: 'analytics', loadChildren:() => import('../analytics/analytics.module').then(m => m.AnalyticsModule), canActivate: [AuthGuard]},
    { path: 'list-users', loadChildren:() => import('../list-users/list-users.module').then(m => m.ListUsersModule), canActivate: [AuthGuard]},
    { path: 'maintanance', loadChildren:() => import('../maintanance/maintanance.module').then(m => m.MaintananceModule), canActivate: [AuthGuard]},
    { path: 'profile', loadChildren:() => import('../update-profile/update-profile.module').then(m => m.UpdateProfileModule), canActivate: [AuthGuard]}
  ]},
];

@NgModule({ 
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
