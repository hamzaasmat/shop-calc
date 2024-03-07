import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/calculator', pathMatch: 'full' },
    { path: 'calculator', loadComponent: () => import('./calculator/calculator.component').then(c => c.CalculatorComponent) },
    { path: 'vendors', loadComponent: () => import('./vendors/vendors.component').then(c => c.VendorsComponent) },
];
