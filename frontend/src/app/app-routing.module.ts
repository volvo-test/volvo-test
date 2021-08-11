import { RegisterVehiclesComponent } from './components/register-vehicles/register-vehicles.component';
import { ListVehiclesComponent } from './components/list-vehicles/list-vehicles.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListVehiclesComponent,
  },
  {
    path: 'register',
    component: RegisterVehiclesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
