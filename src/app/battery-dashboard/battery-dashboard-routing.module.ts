import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BatteryDashboardPage } from './battery-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: BatteryDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatteryDashboardPageRoutingModule {}
