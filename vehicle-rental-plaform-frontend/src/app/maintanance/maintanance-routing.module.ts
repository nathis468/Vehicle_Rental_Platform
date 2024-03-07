import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintananceComponent } from './maintanance.component';

const routes: Routes = [
  {path: '', component: MaintananceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintananceRoutingModule { }
