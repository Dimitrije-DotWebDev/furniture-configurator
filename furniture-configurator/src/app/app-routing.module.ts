import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguratorModule } from './configurator/configurator.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'configurator',
    pathMatch: 'full'
  },
  {
    path: 'configurator',
    loadChildren: (): Promise<typeof ConfiguratorModule> => import('./configurator/configurator.module').then((m) => m.ConfiguratorModule)
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
