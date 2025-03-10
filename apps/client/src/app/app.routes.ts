import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'vehicles',
    loadChildren: () => import('./features/vehicles/vehicles.routes').then(m => m.VEHICLES_ROUTES)
  },
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' }
];