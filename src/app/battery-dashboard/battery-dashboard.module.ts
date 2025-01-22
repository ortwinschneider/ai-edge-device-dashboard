import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BatteryDashboardPageRoutingModule } from './battery-dashboard-routing.module';

import { BatteryDashboardPage } from './battery-dashboard.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BatteryDashboardPageRoutingModule,

  ],
  declarations: []
})
export class BatteryDashboardPageModule {}
