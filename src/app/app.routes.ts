import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/calculator', pathMatch: 'full' },
    { path: 'calculator', loadComponent: () => import('./modules/calculator/calculator.component').then(comp => comp.CalculatorComponent) },
    { path: 'vendors', loadComponent: () => import('./modules/vendors/vendors.component').then(comp => comp.VendorsComponent) },
    { path: 'transactions', loadComponent: () => import('./modules/transactions/transactions.component').then(comp => comp.TransactionsComponent) },
];
