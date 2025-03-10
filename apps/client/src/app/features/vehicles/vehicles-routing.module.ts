import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VEHICLES_ROUTES } from './vehicles.routes';

const routes: Routes = VEHICLES_ROUTES;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }