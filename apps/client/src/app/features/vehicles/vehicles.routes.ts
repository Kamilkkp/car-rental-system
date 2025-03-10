import { Routes } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';

export const VEHICLES_ROUTES: Routes = [
  { path: '', component: VehicleListComponent },
  { path: 'add', component: VehicleFormComponent },
  { path: 'edit/:id', component: VehicleFormComponent }
];