import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguratorComponent } from './configurator/configurator.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'configurator',
    pathMatch: 'full'
  },
  {
    path: 'configurator',
    component: ConfiguratorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
